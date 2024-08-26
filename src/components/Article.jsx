import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Article({slug}) {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticle = async () => {
            console.log("Slug:", slug);

            if (!slug) {
                setError("No slug provided");
                return;
            }

            try {
                // Assuming the server is set up to serve HTML files from a public or dist directory
                const response = await fetch(`/articles/${slug}.html`);

                if (!response.ok) {
                    throw new Error("Article not found");
                }

                const text = await response.text();
                console.log("Loaded HTML content:", text.substring(0, 200)); // Logs first 200 chars of the HTML content

                setContent(text);
            } catch (err) {
                console.error("Error loading the article:", err);
                setError(err.message);
            }
        };

        loadArticle();
    }, [slug]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3>
                <Link to="/articles" className="back">
                    back to articles
                </Link>
            </h3>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
    );
}

export default Article;
