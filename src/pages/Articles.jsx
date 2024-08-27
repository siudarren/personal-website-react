import React from "react";
import {Link} from "react-router-dom";

function Articles() {
    return (
        <div class="body article_list">
            <h2 class="greeting">Articles</h2>
            <Link to="/article/A-Quick-Guide-to-Quantum-Walk-Interpolated-Walk-and-Fast-forwarding-Algorithm">
                <div className="article-box">
                    <h3 className="article-title">
                        A Quick Guide to Quantum Walk, Interpolated Walk, and Fast-forwarding Algorithm
                    </h3>
                    <p className="article-preview">
                        Quantum walks, distinguished by unique properties not present in classical random walks,
                        facilitate the development of algorithms that achieve quantum speedup. This paper delves into
                        the Fast-forwarding Algorithm by Ambainis et al., which assures a quadratic acceleration
                        compared to its classical counterpart in locating marked vertices within arbitrary graphs.
                        Furthermore, this study applies the Fast-forwarding Algorithm to ascertain an up- per bound on
                        the computational cost necessary to confirm matrix multiplication AB = C for matrices A, B, C ∈
                        &real;<sup>nxn</sup>, with a tolerance of &epsilon;.
                    </p>
                </div>
            </Link>
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

export default Articles;
