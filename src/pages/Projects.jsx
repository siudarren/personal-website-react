import React from "react";
import "/src/css/Article_and_Project.css";

function Projects() {
    return (
        <div class="body">
            <h2 class="page_heading">Projects</h2>
            <a href="https://reversi-ai-f1768870ea36.herokuapp.com/#" target="_blank">
                <div class="article-box">
                    <h3 class="article-title">Reversi AI</h3>
                    <p class="article-preview">
                        Over the break, I set out to complete Clubhouse Games: 51 Worldwide Classics on the Nintendo
                        Switch—a collection of 51 mini games. I managed to clear every level for every game, except one:
                        Reversi. The final level's AI was surprisingly tough. I tried using free online Reversi bots for
                        help, but none of them could beat the Switch AI. So, I decided to build my own Reversi
                        AI—designed specifically to take down the toughest opponent in the game. Using a minimax
                        algorithm with a search depth of 5, my AI evaluates board positions and plans moves several
                        steps ahead—strong enough to consistently win where others failed.
                    </p>
                </div>
            </a>
            <a href="https://rubiks-cube-simulator-41497947629e.herokuapp.com/#" target="_blank">
                <div class="article-box">
                    <h3 class="article-title">Rubik's Cube simulator</h3>
                    <p class="article-preview">
                        This project is designed to facilitate learning speed cubing, featuring interactive tools that
                        allow users to virtually solve and scramble a Rubik's Cube using advanced algorithms and
                        intuitive controls. It includes built-in OLL and PLL algorithms, automatic WCA-regulated
                        scrambles, an auto-solver, and more.
                    </p>
                </div>
            </a>
        </div>
    );
}

export default Projects;
