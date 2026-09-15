const STORAGE_KEY = "darren-scroll-positions";

// One position per history entry, not per URL: repeated visits remain independent.
export function scrollEntryKey(location) {
    return `${location.key}:${location.pathname}${location.search}${location.hash}`;
}

export function createScrollRestoration(browser) {
    const document = browser.document;
    let positions = {};
    try {
        const saved = JSON.parse(browser.sessionStorage.getItem(STORAGE_KEY) || "{}");
        if (saved && typeof saved === "object" && !Array.isArray(saved)) positions = saved;
    } catch { /* Storage may be unavailable; in-memory navigation still works. */ }
    let activeKey;
    let restoring = false;
    let cancelPending = () => {};
    const originalMode = browser.history.scrollRestoration;
    browser.history.scrollRestoration = "manual";

    function persist() {
        try {
            positions = Object.fromEntries(Object.entries(positions).slice(-100));
            browser.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
        } catch { /* Private browsing or a full storage quota should not break navigation. */ }
    }

    function remember() {
        if (activeKey && !restoring) positions[activeKey] = {x: browser.scrollX, y: browser.scrollY};
    }

    function saveBeforeLeaving() {
        remember();
        persist();
    }

    browser.addEventListener("scroll", remember, {passive: true});
    // Capture before React replaces content (and the browser potentially clamps scrollY).
    document.addEventListener("click", remember, true);
    browser.addEventListener("popstate", remember);
    browser.addEventListener("pagehide", saveBeforeLeaving);

    function navigate(location, navigationType) {
        cancelPending();
        persist();
        activeKey = scrollEntryKey(location);
        const saved = navigationType === "POP" ? positions[activeKey] : null;
        const position = saved && Number.isFinite(saved.x) && Number.isFinite(saved.y) ? saved : null;
        restoring = true;
        let frame;
        let stopped = false;

        function stop() {
            stopped = true;
            browser.cancelAnimationFrame(frame);
            mutations.disconnect();
            resize?.disconnect();
            browser.removeEventListener("wheel", interrupt);
            browser.removeEventListener("touchstart", interrupt);
            browser.removeEventListener("keydown", onKey);
            restoring = false;
        }

        function interrupt() {
            stop();
            remember();
        }

        function onKey(event) {
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) interrupt();
        }

        function restore() {
            if (stopped || document.querySelector('[data-content-loading="true"]')) return;
            if (document.fonts?.status === "loading") return;
            if (position) {
                browser.scrollTo({left: position.x, top: position.y, behavior: "instant"});
            } else if (location.hash) {
                let id = location.hash.slice(1);
                try { id = decodeURIComponent(id); } catch { /* Keep malformed anchors literal. */ }
                const target = document.getElementById(id) || document.getElementsByName(id)[0];
                if (target) target.scrollIntoView({behavior: "instant", block: "start"});
                else browser.scrollTo({left: 0, top: 0, behavior: "instant"});
            } else {
                browser.scrollTo({left: 0, top: 0, behavior: "instant"});
            }
            stop();
            remember();
        }

        function schedule() {
            if (stopped) return;
            browser.cancelAnimationFrame(frame);
            frame = browser.requestAnimationFrame(restore);
        }

        const mutations = new browser.MutationObserver(schedule);
        mutations.observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ["data-content-loading"]});
        const resize = browser.ResizeObserver ? new browser.ResizeObserver(schedule) : null;
        resize?.observe(document.body);
        browser.addEventListener("wheel", interrupt, {passive: true});
        browser.addEventListener("touchstart", interrupt, {passive: true});
        browser.addEventListener("keydown", onKey);
        document.fonts?.ready.then(schedule);
        cancelPending = stop;
        // New pages start at the top immediately, including while their article is loading.
        if (!position) browser.scrollTo({left: 0, top: 0, behavior: "instant"});
        schedule();
    }

    return {
        navigate,
        destroy() {
            saveBeforeLeaving();
            cancelPending();
            browser.removeEventListener("scroll", remember);
            document.removeEventListener("click", remember, true);
            browser.removeEventListener("popstate", remember);
            browser.removeEventListener("pagehide", saveBeforeLeaving);
            browser.history.scrollRestoration = originalMode;
        },
    };
}
