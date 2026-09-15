import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "/src/pages/Home"; // Import Home Page
import Projects from "/src/pages/Projects"; // Import Projects Page
import Articles from "/src/pages/Articles"; // Import Articles Page
import ContentPage from "./components/ContentPage";
import Header from "/src/components/Header.jsx"; // Import Header
import Blog from "/src/pages/Blog";

import "/src/css/App.css";
import usePageTracking from "./usePageTracking";
import useContentPrefetch from "./useContentPrefetch";
import useScrollRestoration from "./useScrollRestoration";

// The jsx that puts every components of the website together
// Top-level: only one Router
function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}

// This lives inside the Router, so useLocation() works
function AppRoutes() {
    usePageTracking();
    useContentPrefetch();
    useScrollRestoration();

    return (
        <div className="background">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/article/:slug" element={<ContentPage />} />
                <Route path="/blog/:slug" element={<ContentPage />} />
            </Routes>
        </div>
    );
}

export default App;
