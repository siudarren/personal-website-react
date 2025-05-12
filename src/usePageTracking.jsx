import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export default function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("event", "page_view", {
                page_path: location.pathname,
            });
        }
    }, [location]);
}
