import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "/src/css/article_styles.css"; // Importing CSS styles specific to the article component

// Article component definition accepting 'slug' as a prop to load specific articles
function Blog_Post({slug}) {
    const [content, setContent] = useState(""); // State to hold article content
    const [error, setError] = useState(null); // State to manage loading errors

    // Effect hook to load the article when 'slug' changes
    useEffect(() => {
        // Asynchronous function to fetch the article based on the slug
        const loadArticle = async () => {
            // Guard clause to handle cases where no slug is provided
            if (!slug) {
                setError("No slug provided");
                return;
            }

            try {
                // Fetching the article from the server assuming the files are served from a public or dist directory
                const response = await fetch(`${import.meta.env.BASE_URL}blog_posts/${slug}.html`);

                // Error handling if the fetch operation fails (e.g., response not OK)
                if (!response.ok) {
                    throw new Error("Blog post not found");
                }

                // Extracting text from the fetch response
                const text = await response.text();
                setContent(text); // Setting the loaded content to the state
            } catch (err) {
                console.error("Error loading the blog post:", err);
                setError(err.message); // Setting the error state to the error message
            }
        };

        loadArticle(); // Executing the loadArticle function upon component mount or slug change
    }, [slug]); // Effect dependencies include only the 'slug'

    // Rendering error message if there is an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Article component layout
    return (
        <div>
            {/* Link to navigate back to the articles list */}
            <Link to="/Blog">
                <h3 className="back">back to blog posts</h3>
            </Link>

            {/* Rendering HTML content directly from the state */}
            <div dangerouslySetInnerHTML={{__html: content}} />

            {/* Duplicate link for better user navigation */}
            <Link to="/Blog">
                <h3 className="back end_back">back to blog posts</h3>
            </Link>
        </div>
    );
}

// Exporting Article component for use in other parts of the application
export default Blog_Post;
