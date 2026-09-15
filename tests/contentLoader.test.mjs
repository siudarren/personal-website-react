import assert from "node:assert/strict";
import {readFile, readdir} from "node:fs/promises";
import test from "node:test";
import {runInNewContext} from "node:vm";
import {contentPath, contentPathFromLink, createContentLoader} from "../src/contentLoader.js";

const html = '<html><body><h2 class="article_title">An article</h2><p>Content</p></body></html>';
const response = (body = html, status = 200) => new Response(body, {status, headers: {"content-type": "text/html; charset=utf-8"}});

test("prefetch and navigation share a request, and revisits use cached HTML", async () => {
    let calls = 0;
    let requestedUrl;
    const loader = createContentLoader({fetcher: async (url) => { calls++; requestedUrl = url; return response(); }});
    const prefetch = loader.load("articles/example.html");
    assert.equal(loader.load("articles/example.html"), prefetch);
    assert.equal(await prefetch, html);
    assert.equal(loader.peek("articles/example.html"), html);
    assert.equal(await loader.load("articles/example.html"), html);
    assert.equal(calls, 1);
    assert.equal(requestedUrl, "/articles/example.html");
});

test("failed requests can be retried successfully", async () => {
    let calls = 0;
    const loader = createContentLoader({fetcher: async () => ++calls === 1 ? response("Unavailable", 503) : response()});
    await assert.rejects(loader.load("articles/example.html"), /try again/);
    assert.equal(loader.peek("articles/example.html"), undefined);
    assert.equal(await loader.load("articles/example.html"), html);
    assert.equal(calls, 2);
});

test("network failures provide a connection error and do not poison the cache", async () => {
    const loader = createContentLoader({fetcher: async () => { throw new TypeError("Failed to fetch"); }});
    await assert.rejects(loader.load("articles/example.html"), /Check your connection/);
    assert.equal(loader.peek("articles/example.html"), undefined);
});

test("missing pages and HTTP 200 SPA fallback documents are rejected", async () => {
    for (const reply of [response("Missing", 404), response('<html><body><div id="root"></div></body></html>'), response('<html><head><script>location.replace("/")</script></head><body></body></html>'), new Response(html)]) {
        const loader = createContentLoader({fetcher: async () => reply});
        await assert.rejects(loader.load("articles/missing.html"), /could not be found/);
    }
});

test("content expires after five minutes so later visits can get updates", async () => {
    let time = 0;
    let calls = 0;
    const loader = createContentLoader({now: () => time, fetcher: async () => { calls++; return response(); }});
    await loader.load("articles/example.html");
    time = 300000;
    assert.equal(loader.peek("articles/example.html"), undefined);
    await loader.load("articles/example.html");
    assert.equal(calls, 2);
});

test("late responses for another page remain isolated", async () => {
    const finish = new Map();
    const loader = createContentLoader({fetcher: (url) => new Promise((resolve) => finish.set(url, resolve))});
    const first = loader.load("articles/first.html");
    const second = loader.load("blog_posts/second.html");
    await Promise.resolve();
    finish.get("/blog_posts/second.html")(response("<h2>Second</h2>"));
    await second;
    finish.get("/articles/first.html")(response("<h2>First</h2>"));
    await first;
    assert.equal(loader.peek("blog_posts/second.html"), "<h2>Second</h2>");
    assert.equal(loader.peek("articles/first.html"), "<h2>First</h2>");
});

test("only local article and blog links qualify for prefetch", () => {
    const page = "https://www.darrensiu.com/blog";
    assert.equal(contentPathFromLink("/article/Quantum-Walk#results", page), "articles/Quantum-Walk.html");
    assert.equal(contentPathFromLink("/blog/Example/?source=home", page), "blog_posts/Example.html");
    for (const link of ["https://external.test/blog/Example", "/projects", "/blog", "mailto:hello@example.com", "/blog/a%2Fb"]) {
        assert.equal(contentPathFromLink(link, page), null);
    }
    assert.equal(contentPath("articles", "../index"), null);
    assert.equal(contentPath("unknown", "Example"), null);
});

test("invalid slugs never make a request", async () => {
    const loader = createContentLoader({fetcher: () => assert.fail("Unexpected fetch")});
    await assert.rejects(loader.load(contentPath("articles", "../index")), /could not be found/);
});

test("cache stays bounded as more pages are visited", async () => {
    const loader = createContentLoader({fetcher: async () => response()});
    for (let index = 0; index < 21; index++) await loader.load(`articles/${index}.html`);
    assert.equal(loader.peek("articles/0.html"), undefined);
    assert.equal(loader.peek("articles/20.html"), html);
});

test("every existing article and blog document loads without altering its HTML", async () => {
    for (const collection of ["articles", "blog_posts"]) {
        const directory = new URL(`../public/${collection}/`, import.meta.url);
        for (const filename of await readdir(directory)) {
            if (!filename.endsWith(".html")) continue;
            const original = await readFile(new URL(filename, directory), "utf8");
            const loader = createContentLoader({fetcher: async () => response(original)});
            assert.equal(await loader.load(`${collection}/${filename}`), original);
        }
    }
});

test("direct article preload agrees with navigation, including GitHub Pages redirects", async () => {
    const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
    const scripts = [...index.matchAll(/<script>([\s\S]*?)<\/script>/g)].slice(0, 2);
    for (const route of ["/article/Quantum-Walk", "/blog/Example", "/BLOG/Example/", "/", "/projects"]) {
        for (const redirected of [false, true]) {
            const location = new URL(redirected ? `https://www.darrensiu.com/?${route}` : `https://www.darrensiu.com${route}`);
            const links = [];
            const context = {
                window: {location, history: {replaceState: (_state, _title, url) => { location.href = new URL(url, location).href; }}},
                document: {createElement: () => ({}), head: {appendChild: (link) => links.push(link)}},
            };
            for (const [, script] of scripts) runInNewContext(script, context);
            const path = contentPathFromLink(route, "https://www.darrensiu.com/");
            assert.equal(links.length, path ? 1 : 0);
            if (path) {
                assert.equal(links[0].href, `/${path}`);
                assert.equal(links[0].rel, "preload");
                assert.equal(links[0].as, "fetch");
                assert.equal(links[0].crossOrigin, "anonymous");
            }
        }
    }
});
