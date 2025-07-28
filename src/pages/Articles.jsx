import React from "react";
import {Link} from "react-router-dom";
import "/src/css/Article_and_Project.css";

function Articles() {
    return (
        <div class="body article_list">
            <h2 class="page_heading">Academic & Technical Writing</h2>
            <Link to="/article/A-Dynamic-Analysis-of-Rotating-Memory-Tic-Tac-Toe">
                <div className="article-box">
                    <div className="article-box-head">
                        <h3 className="article-title">
                            A Quick Guide to Quantum Walk, Interpolated Walk, and Fast-forwarding Algorithm
                        </h3>
                        <h4 className="date-and-read-time">May 6th, 2024 | 20 minute read</h4>
                    </div>

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
        </div>
    );
}

export default Articles;
