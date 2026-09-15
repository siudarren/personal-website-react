import assert from 'node:assert/strict';
import test from 'node:test';
import {createScrollRestoration, scrollEntryKey} from '../src/scrollRestoration.js';

function environment() {
    const browser = new EventTarget();
    const document = new EventTarget();
    const frames = new Map();
    const observers = new Set();
    let nextFrame = 0;
    let stored = null;
    Object.assign(document, {
        body: {}, loading: false, fonts: {status: 'loaded', ready: Promise.resolve()},
        querySelector: () => document.loading ? {} : null,
        getElementById: () => null,
        getElementsByName: () => [],
    });
    class Observer {
        constructor(callback) { this.callback = callback; }
        observe() { observers.add(this); }
        disconnect() { observers.delete(this); }
    }
    Object.assign(browser, {
        document, scrollX: 0, scrollY: 0, history: {scrollRestoration: 'auto'},
        sessionStorage: {getItem: () => stored, setItem: (_key, value) => { stored = value; }},
        MutationObserver: Observer, ResizeObserver: Observer,
        requestAnimationFrame: (callback) => { const id = ++nextFrame; frames.set(id, callback); return id; },
        cancelAnimationFrame: (id) => frames.delete(id),
        scrollTo: ({left, top}) => { browser.scrollX = left; browser.scrollY = top; browser.dispatchEvent(new Event('scroll')); },
        flush: () => { const work = [...frames.values()]; frames.clear(); work.forEach(callback => callback()); },
        contentReady: () => { document.loading = false; for (const observer of observers) observer.callback(); browser.flush(); },
    });
    return browser;
}
const location = (key, pathname = '/blog/example', hash = '') => ({key, pathname, hash, search: ''});

test('new navigation goes to the top; Back and Forward restore independent positions', () => {
    const browser = environment();
    const scroll = createScrollRestoration(browser);
    assert.equal(browser.history.scrollRestoration, 'manual');
    scroll.navigate(location('list', '/blog'), 'POP');browser.flush();
    browser.scrollTo({left: 0, top: 450});
    scroll.navigate(location('article'), 'PUSH');browser.flush();
    assert.equal(browser.scrollY, 0);
    browser.scrollTo({left: 0, top: 1800});
    scroll.navigate(location('list', '/blog'), 'POP');browser.flush();
    assert.equal(browser.scrollY, 450);
    scroll.navigate(location('article'), 'POP');browser.flush();
    assert.equal(browser.scrollY, 1800);
    scroll.destroy();
    assert.equal(browser.history.scrollRestoration, 'auto');
});

test('saved position waits for async content without being overwritten by layout clamping', () => {
    const browser = environment();
    const scroll = createScrollRestoration(browser);
    scroll.navigate(location('article'), 'PUSH');browser.flush();
    browser.scrollTo({left: 0, top: 2200});
    scroll.navigate(location('list', '/blog'), 'PUSH');browser.flush();
    browser.document.loading = true;
    scroll.navigate(location('article'), 'POP');browser.flush();
    browser.scrollTo({left: 0, top: 0});
    browser.contentReady();
    assert.equal(browser.scrollY, 2200);
    scroll.destroy();
});

test('decoded anchors wait for content and fonts before scrolling', () => {
    const browser = environment();
    const scroll = createScrollRestoration(browser);
    let targetId;
    browser.document.getElementById = id => {
        targetId = id;
        return {scrollIntoView: () => browser.scrollTo({left: 0, top: 900})};
    };
    browser.document.loading = true;
    browser.document.fonts.status = 'loading';
    scroll.navigate(location('anchor', '/article/example', '#S2%2ESS1'), 'PUSH');browser.flush();
    browser.contentReady();
    assert.equal(targetId, undefined);
    browser.document.fonts.status = 'loaded';
    browser.contentReady();
    assert.equal(targetId, 'S2.SS1');
    assert.equal(browser.scrollY, 900);
    scroll.destroy();
});

test('user scrolling cancels delayed restoration', () => {
    const browser = environment();
    const scroll = createScrollRestoration(browser);
    let moved = false;
    browser.document.getElementById = () => ({scrollIntoView: () => { moved = true; }});
    browser.document.loading = true;
    scroll.navigate(location('anchor', '/article/example', '#conclusion'), 'PUSH');
    browser.dispatchEvent(new Event('wheel'));
    browser.contentReady();
    assert.equal(moved, false);
    scroll.destroy();
});

test('positions survive controller recreation and unavailable storage is harmless', () => {
    const browser = environment();
    let scroll = createScrollRestoration(browser);
    scroll.navigate(location('article'), 'POP');browser.flush();
    browser.scrollTo({left: 0, top: 1400});
    scroll.destroy();
    browser.scrollY = 0;
    scroll = createScrollRestoration(browser);
    scroll.navigate(location('article'), 'POP');browser.flush();
    assert.equal(browser.scrollY, 1400);
    scroll.destroy();
    browser.sessionStorage.getItem = browser.sessionStorage.setItem = () => { throw new Error('Denied'); };
    scroll = createScrollRestoration(browser);
    scroll.navigate(location('new'), 'PUSH');browser.flush();
    assert.equal(browser.scrollY, 0);
    scroll.destroy();
});

test('repeated URLs and native fragment entries use distinct keys', () => {
    assert.notEqual(scrollEntryKey(location('one')), scrollEntryKey(location('two')));
    assert.notEqual(scrollEntryKey(location('default', '/article/example', '#one')), scrollEntryKey(location('default', '/article/example', '#two')));
});
