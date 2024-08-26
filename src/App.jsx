import React from "react";
// import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams,
} from "react-router-dom";

import Home from "/src/pages/Home"; // Import Home Page
import Projects from "/src/pages/Projects"; // Import Projects Page
import Articles from "/src/pages/Articles"; // Import Articles Page
import Article from "/src/components/Article"; // Import Article Template
import Header from "/src/components/Header.jsx"; // Import Header
import "/src/App.css";

// The jsx that puts every components of the website together
function App() {
    return (
        <Router>
            {/* The background is the box that includes every DOM of the website */}
            {/* It decides the width of the webpage */}
            <div className="background">
                {/* The Header is a link that goes back to the home page  */}
                {/* Header is on the top of every webpage on the site */}
                <Header /> {/* Use Header here so it appears on all pages */}
                <Routes>
                    {/* The route that takes user back to the home page */}
                    <Route path="/" element={<Home />} />

                    {/* The route that takes user to view the list of projects */}
                    <Route path="/projects" element={<Projects />} />

                    {/* The route that takes user to view the list of articles */}
                    <Route path="/articles" element={<Articles />} />

                    {/* The route that takes user to specific article */}
                    {/* slug is the name of the article */}
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
