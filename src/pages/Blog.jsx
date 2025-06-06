import React from "react";
import {Link} from "react-router-dom";
import "/src/css/Article_and_Project.css";

function Blog() {
    return (
        <div class="body article_list">
            <h2 class="page_heading">Blog Posts</h2>
            <Link to="/blog/Epiphany-522">
                <div className="article-box">
                    <div className="article-box-head">
                        <h3 className="article-title">Epiphany 522</h3>
                        <h4 className="date-and-read-time">June 2nd, 2025 | 4 minute read</h4>
                    </div>
                    <p className="article-preview">
                        Growing up in a family and community rooted in Chinese culture, I was always taught that
                        everything has two sides. Just like Yin and Yang, nothing is purely good or purely bad:
                        admiration and fame come with jealousy and betrayal; extraordinary talent comes with pressure;
                        and success comes with loneliness.
                    </p>
                </div>
            </Link>
            <Link to="/blog/A-Romantic-Revisit-to-On-Bullshit">
                <div className="article-box">
                    <div className="article-box-head">
                        <h3 className="article-title">A Romantic Revisit to On Bullshit</h3>
                        <h4 className="date-and-read-time">May 16th, 2025 | 3 minute read</h4>
                    </div>
                    <p className="article-preview">
                        A few weeks ago, I went on a date with a girl. She wasn't what I thought I was looking for — she
                        didn't check many of the boxes I had kept in mind for a long-term partner — and yet, it turned
                        out to be one of the best dates I've ever had. It wasn't romantic in any dramatic way. It was
                        peaceful. We laughed, debated values, walked around, talked, and wandered into a few new stores
                        and museums together — nothing particularly special.
                    </p>
                </div>
            </Link>
            <Link to="/blog/What-a-Third-Grade-Fight-Taught-Me-About-Game-Theory">
                <div className="article-box">
                    <div className="article-box-head">
                        <h3 className="article-title">What a Third-Grade Fight Taught Me About Game Theory</h3>
                        <h4 className="date-and-read-time">May 4th, 2025 | 5 minute read</h4>
                    </div>
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
                    <div className="article-box-head">
                        <h3 className="article-title">Expression of Love</h3>
                        <h4 className="date-and-read-time">Feb 11th, 2025 | 3 minute read</h4>
                    </div>

                    <p className="article-preview">
                        Back in 2018, during my college application process, my friend Alex suggested I read "50
                        Successful Harvard Application Essays," a compilation of personal statements from students
                        admitted to Harvard, to help with my challenges in writing college essays. One essay, in
                        particular, left a deep impression on me, even after many years.
                    </p>
                </div>
            </Link>

            {/* <Link to="/blog/A-Potentially-Easier-Way-to-Calculate-the-Cross-Product">
                <div className="article-box">
                    <div className="article-box-head">
                        <h3 className="article-title">A Potentially Easier Way to Calculate the Cross Product</h3>
                        <h4 className="date-and-read-time">Aug 26th, 2024 | 3 minute read</h4>
                    </div>

                    <p className="article-preview">
                        One of the first things I noticed after arriving in the United States for college was how people
                        write and calculate math differently. Due to variations in language, it is normal for people to
                        write mathematical expressions in different orders. For example, when writing fractions, English
                        speakers always write the numerator first, followed by the denominator.
                    </p>
                </div>
            </Link> */}
        </div>
    );
}

export default Blog;
