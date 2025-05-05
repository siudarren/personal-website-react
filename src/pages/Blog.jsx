import React from "react";
import {Link} from "react-router-dom";
import "/src/css/Article_and_Project.css";

function Blog() {
    return (
        <div class="body article_list">
            <h2 class="page_heading">Blog Posts</h2>
            <Link to="/blog/What-a-Third-Grade-Fight-Taught-Me-About-Game-Theory">
                <div className="article-box">
                    <h3 className="article-title">What a Third-Grade Fight Taught Me About Game Theory</h3>
                    <p className="article-preview">
                        Back in middle school, I read an ancient Chinese short story called "Tian Ji's Horse Racing." It
                        tells of a horse race between Tian Ji, a military general from the state of Qi, and the King of
                        Qi. Both men enjoyed racing and frequently bet against each other. Each would select three
                        horses, ranking them as best, second-best, and worst.
                    </p>
                </div>
            </Link>

            <Link to="/blog/Expression-of-Love">
                <div className="article-box">
                    <h3 className="article-title">Expression of Love</h3>
                    <p className="article-preview">
                        Back in 2018, during my college application process, my friend Alex suggested I read "50
                        Successful Harvard Application Essays," a compilation of personal statements from students
                        admitted to Harvard, to help with my challenges in writing college essays. One essay, in
                        particular, left a deep impression on me, even after many years.
                    </p>
                </div>
            </Link>

            <Link to="/blog/A-Potentially-Easier-Way-to-Calculate-the-Cross-Product">
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
