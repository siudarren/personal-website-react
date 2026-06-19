import React from "react";
import {Link} from "react-router-dom";
import "/src/css/Home.css";

function Home() {
    return (
        <main className="body">
            <section className="introduction_box">
                <h2 className="page_heading">
                    <span className="hi">Hi,</span> I'm Darren
                </h2>
                <div className="home_content">
                    <div className="introduction">
                        <p>
                            I am a digital hardware engineer at Apple  with a strong foundation in mathematics and physics from UC
                            Berkeley. Outside of work, I enjoy fencing, coding, creative writing, and solving Rubik's
                            Cubes for the challenge and fun.
                        </p>

                        <h3 className="projects">Recent Projects:</h3>
                        <ul>
                            <li>
                                <p>
                                    <a href="https://2048.darrensiu.com" className="home_project_title" target="_blank">
                                        Afterstate DQN 2048 AI
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a
                                        href="https://reversi.darrensiu.com"
                                        className="home_project_title"
                                        target="_blank">
                                        An online Reversi AI made to clear Clubhouse Games: 51 Worldwide Classics on
                                        Nintendo Switch.
                                    </a>
                                </p>
                            </li>
                            {/* <li>
                                <p>
                                    <a
                                        href="https://cube.darrensiu.com/#"
                                        className="home_project_title"
                                        target="_blank">
                                        A Rubik's Cube simulator designed to facilitate learning speed cubing
                                    </a>
                                </p>
                            </li> */}
                        </ul>

                        <Link to="/projects" className="view_all">
                            view all
                        </Link>

                        <h3 className="projects">Blog Posts:</h3>
                        <ul>
                            <li>
                                <p>
                                    <Link
                                        className="home_project_title"
                                        to={"/blog/What-a-Third-Grade-Fight-Taught-Me-About-Game-Theory"}>
                                        What a Third-Grade Fight Taught Me About Game Theory
                                    </Link>
                                </p>
                            </li>
                            <li>
                                <p>
                                    <Link className="home_project_title" to={"/blog/Expression-of-Love"}>
                                        Expression of Love
                                    </Link>
                                </p>
                            </li>
                        </ul>
                        <Link to="/blog" className="view_all">
                            view all
                        </Link>
                        <h3 className="projects">Academic & Technical Writing:</h3>
                        <ul>
                            <li>
                                <p>
                                    <Link
                                        to={
                                            "/article/A-Quick-Guide-to-Quantum-Walk-Interpolated-Walk-and-Fast-forwarding-Algorithm"
                                        }
                                        className="home_project_title">
                                        A Quick Guide to Quantum Walk, Interpolated Walk, and Fast-forwarding Algorithm
                                    </Link>
                                </p>
                            </li>
                        </ul>

                        <Link to="/articles" className="view_all">
                            view all
                        </Link>
                    </div>

                    <div className="profile_box">
                        <img
                            src="/profile_pic.png"
                            alt="A Picture of Darren Siu in front of the SF City Hall"
                            className="profile_pic"
                        />
                    </div>
                    <div className="icons">
                        <a href="https://www.linkedin.com/in/darren-siu" target="_blank">
                            <i className="fa-brands fa-linkedin">&nbsp;</i>
                        </a>
                        <a href="https://github.com/siudarren" target="_blank">
                            <i className="fa-brands fa-square-github"></i>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
