import React from "react";
import {Link} from "react-router-dom";
import "/src/css/Article_and_Project.css";

function Blog() {
    return (
        <div class="body article_list">
            <h2 class="page_heading">Blog Posts</h2>
            <Link to="/article/A-Potentially-Easier-Way-to-Calculate-the-Cross-Product">
                <div className="article-box">
                    <h3 className="article-title">A Potentially Easier Way to Calculate the Cross Product</h3>
                    <p className="article-preview">
                        One of the first things I noticed after arriving in the United States for college was how people
                        write and calculate math differently. Due to variations in language, it is normal for people to
                        write mathematical expressions in different orders. For example, when writing fractions, English
                        speakers always write the numerator first, followed by the denominator.
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default Blog;
