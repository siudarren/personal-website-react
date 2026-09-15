import {useEffect} from "react";
import {contentLoader, contentPathFromLink} from "./contentLoader";

export default function useContentPrefetch() {
    useEffect(() => {
        function prefetch(event) {
            const connection = navigator.connection;
            if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "")) return;
            const link = event.target.closest?.("a[href]");
            if (!link || link.hasAttribute("download")) return;
            const path = contentPathFromLink(link.href, window.location.href);
            if (path) {
                // Navigation shares this request; speculative failures are retried on opening.
                contentLoader.load(path).catch(() => {});
            }
        }

        document.addEventListener("pointerover", prefetch, {passive: true});
        document.addEventListener("focusin", prefetch);
        document.addEventListener("touchstart", prefetch, {passive: true});
        return () => {
            document.removeEventListener("pointerover", prefetch);
            document.removeEventListener("focusin", prefetch);
            document.removeEventListener("touchstart", prefetch);
        };
    }, []);
}
