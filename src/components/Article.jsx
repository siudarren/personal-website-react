import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Article({slug}) {
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);

    const articles = import.meta.glob("/src/articles/*.html");

    useEffect(() => {
        const loadArticle = async () => {
            console.log("Slug:", slug);
            console.log("Articles available:", Object.keys(articles));
            console.log(
                "Resolved path:",
                articles[`/src/articles/${slug}.html`]
            );

            try {
                if (!slug) {
                    throw new Error("No slug provided");
                }

                const articlePath = articles[`/src/articles/${slug}.html`];

                if (!articlePath) {
                    throw new Error("Article not found");
                }

                // Dynamically import the HTML module
                const module = await articlePath();
                // Fetch the HTML content from the resolved module path
                const response = await fetch(module.default);
                console.log("Fetch status:", response.status); // Log the response status to debug

                // Retrieve and log the HTML content
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
                    {" "}
                    back to articles{" "}
                </Link>
            </h3>
            <div dangerouslySetInnerHTML={{__html: content}} />;
        </div>
    );
}

export default Article;
