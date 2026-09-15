import {useLayoutEffect, useRef} from "react";
import {useLocation, useNavigationType} from "react-router-dom";
import {createScrollRestoration} from "./scrollRestoration";

export default function useScrollRestoration() {
    const location = useLocation();
    const navigationType = useNavigationType();
    const controller = useRef(null);

    useLayoutEffect(() => {
        controller.current = createScrollRestoration(window);
        return () => controller.current.destroy();
    }, []);

    useLayoutEffect(() => {
        controller.current.navigate(location, navigationType);
    }, [location, navigationType]);
}
