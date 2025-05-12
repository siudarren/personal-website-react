import React from "react";
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";

import Home from "/src/pages/Home"; // Import Home Page
import Projects from "/src/pages/Projects"; // Import Projects Page
import Articles from "/src/pages/Articles"; // Import Articles Page
import Article from "/src/components/Article"; // Import Article Template
import Header from "/src/components/Header.jsx"; // Import Header
import Blog from "/src/pages/Blog";
import Blog_Post from "./components/Blog_Post";

import "/src/css/App.css";
import usePageTracking from "./usePageTracking";

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

    return (
        <div className="background">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/article/:slug" element={<ArticleRouteWrapper />} />
                <Route path="/blog/:slug" element={<BlogRouteWrapper />} />
            </Routes>
        </div>
    );
}

// In a wrapper component to extract the slug from the URL
function ArticleRouteWrapper() {
    const {slug} = useParams(); // Extract the slug from the URL
    return <Article slug={slug} />;
}

function BlogRouteWrapper() {
    const {slug} = useParams(); // Extract the slug from the URL
    return <Blog_Post slug={slug} />;
}
export default App;
