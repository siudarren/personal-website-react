import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <main className="body">
            <section className="introduction_box">
                <h2 className="greeting">
                    <span className="hi">Hi,</span> I'm Darren
                </h2>
                <div className="introduction">
                    <p>
                        I am currently studying at the{" "}
                        <span className="highlight">UC Berkeley</span> and my
                        academic passions lie in{" "}
                        <span className="highlight">mathematics</span> and&nbsp;
                        <span className="highlight">physics</span>.
                        Additionally, I enjoy fencing,
                        <span>coding</span>, and solving Rubik's Cube as side
                        hobbies.
                    </p>

                    <h3 className="projects">Recent Projects:</h3>
                    <ul>
                        <li>
                            <p>
                                <a
                                    href="https://rubiks-cube-simulator-41497947629e.herokuapp.com/#"
                                    className="project_title"
                                    target="_blank">
                                    A Rubik's Cube simulator designed to
                                    facilitate learning speed cubing
                                </a>
                            </p>
                        </li>
                    </ul>

                    <Link to="/projects" className="view_all">
                        view all
                    </Link>

                    <h3 className="projects">Articles:</h3>
                    <ul>
                        <li>
                            <p>
                                <Link
                                    to={
                                        "/article/A-Quick-Guide-to-Quantum-Walk-Interpolated-Walk-and-Fast-forwarding-Algorithm"
                                    }
                                    className="project_title">
                                    A Quick Guide to Quantum Walk, Interpolated
                                    Walk, and Fast-forwarding Algorithm
                                </Link>
                            </p>
                        </li>
                        <li>
                            <p>
                                <Link
                                    className="project_title"
                                    to={
                                        "/article/A-Potentially-Easier-Way-to-Calculate-the-Cross-Product"
                                    }>
                                    A Potentially Easier Way to Calculate the
                                    Cross Product
                                </Link>
                            </p>
                        </li>
                    </ul>

                    <Link to="/articles" className="view_all">
                        view all
                    </Link>

                    <div className="icons">
                        <a
                            href="https://www.linkedin.com/in/darren-siu-09256617b"
                            target="_blank">
                            <i className="fa-brands fa-linkedin">&nbsp;</i>
                        </a>
                        <a href="https://github.com/siudarren" target="_blank">
                            <i className="fa-brands fa-square-github"></i>
                        </a>
                    </div>
                </div>

                <div className="profile_box">
                    <img
                        src="/profile_pic.png"
                        alt="A Picture of Darren Siu in front of the SF City Hall"
                        className="profile_pic"
                    />
                </div>
            </section>
        </main>
    );
}

export default Home;
