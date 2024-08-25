import React from "react";
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import Home from "/src/pages/Home";
import Projects from "/src/pages/Projects";
import Articles from "/src/pages/Articles";
import Article from "/src/components/Article";
import Header from "/src/components/Header.jsx"; // Import Header
import "/src/App.css";

function App() {
    return (
        <Router>
            <div className="background">
                <Header /> {/* Use Header here so it appears on all pages */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route
                        path="/article/:slug"
                        element={<ArticleRouteWrapper />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

// In a wrapper component to extract the slug from the URL
function ArticleRouteWrapper() {
    const {slug} = useParams(); // Extract the slug from the URL
    return <Article slug={slug} />;
}


export default App;
