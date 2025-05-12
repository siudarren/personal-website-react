import {useLocation} from "react-router-dom";
import {useEffect} from "react";

const GA_MEASUREMENT_ID = "G-N729BR6ZKZ";

export default function usePageTracking() {
    const {pathname} = useLocation();

    useEffect(() => {
        if (window.gtag) {
            console.log("📈 sending page_view for:", pathname);

            window.gtag("config", GA_MEASUREMENT_ID, {
                page_path: pathname,
                page_title: document.title,
            });
        }
    }, [pathname]);
}
