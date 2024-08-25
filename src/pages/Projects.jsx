import React from "react";
import {Link} from "react-router-dom";

function Projects() {
    return (
        <div class="body">
            <h2 class="greeting">Projects</h2>
            <a
                href="https://rubiks-cube-simulator-41497947629e.herokuapp.com/#"
                target="_blank">
                <div class="article-box">
                    <h3 class="article-title">Rubik's Cube simulator</h3>
                    <p class="article-preview">
                        This project is designed to facilitate learning speed
                        cubing, featuring interactive tools that allow users to
                        virtually solve and scramble a Rubik's Cube using
                        advanced algorithms and intuitive controls. It includes
                        built-in OLL and PLL algorithms, automatic WCA-regulated
                        scrambles, an auto-solver, and more.
                    </p>
                </div>
            </a>
        </div>
    );
}

export default Projects;
