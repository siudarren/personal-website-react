const COLLECTIONS = new Set(["articles", "blog_posts"]);

export function contentPath(collection, slug) {
    if (!COLLECTIONS.has(collection) || !/^[a-zA-Z0-9_-]+$/.test(slug || "")) return null;
    return `${collection}/${slug}.html`;
}

export function contentPathFromLink(href, pageUrl) {
    const url = new URL(href, pageUrl);
    if (url.origin !== new URL(pageUrl).origin) return null;
    const match = url.pathname.match(/^\/(article|blog)\/([^/]+)\/?$/i);
    return match ? contentPath(match[1].toLowerCase() === "article" ? "articles" : "blog_posts", match[2]) : null;
}

export function createContentLoader({fetcher = globalThis.fetch, baseUrl = "/", now = Date.now} = {}) {
    const cache = new Map();
    const pending = new Map();
    const maxAge = 5 * 60 * 1000;

    function peek(path) {
        const entry = cache.get(path);
        if (entry && now() - entry.loadedAt < maxAge) return entry.html;
        cache.delete(path);
        return undefined;
    }

    function load(path) {
        if (!path) return Promise.reject(new Error("This page could not be found."));
        const cached = peek(path);
        if (cached !== undefined) return Promise.resolve(cached);
        if (pending.has(path)) return pending.get(path);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const request = Promise.resolve().then(async () => {
            const response = await fetcher(`${baseUrl}${path}`, {signal: controller.signal});
            if (response.status === 404) throw new Error("This page could not be found.");
            if (!response.ok) throw new Error("Unable to load this page. Please try again.");
            const html = await response.text();
            // Static hosts can return their SPA shell or redirect document with HTTP 200.
            if (!response.headers.get("content-type")?.includes("text/html") || !/<h[1-6]\b/i.test(html)) {
                throw new Error("This page could not be found.");
            }
            cache.set(path, {html, loadedAt: now()});
            if (cache.size > 20) cache.delete(cache.keys().next().value);
            return html;
        }).catch((error) => {
            if (error.name === "AbortError") throw new Error("Loading took too long. Please try again.");
            if (error instanceof TypeError) throw new Error("Unable to load this page. Check your connection and try again.");
            throw error;
        }).finally(() => {
            clearTimeout(timeout);
            pending.delete(path);
        });
        pending.set(path, request);
        return request;
    }

    return {peek, load};
}

export const contentLoader = createContentLoader({baseUrl: import.meta.env?.BASE_URL || "/"});
