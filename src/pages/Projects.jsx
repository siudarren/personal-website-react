import React from "react";
import "/src/css/Article_and_Project.css";

function Projects() {
    return (
        <div class="body">
            <h2 class="page_heading">Projects</h2>
            <a href="https://vanishing-tic-tac-toe-0a2e3fedef0f.herokuapp.com/#" target="_blank">
                <div class="article-box">
                    <h3 class="article-title">Vanishing Tic Tac Toe</h3>
                    <p class="article-preview">
                        While scrolling through Instagram Reels, I came across an intriguing variation of Tic Tac Toe
                        with a twist: once there are more than six tiles on the board, the oldest tile disappears.
                        Curious whether this version is also a solved game like the classic one—which results in a
                        forced draw with perfect play—I built an online version and implemented a Minimax AI to explore
                        it further. Through analysis, I discovered that this variant has a forced win in 7 moves from
                        the initial position. However, if the first move is restricted to the center or a corner—rather
                        than the side edge, which is required for the 7-move forced win—the game results in a forced
                        draw due to repetition. A detailed explanation, including the mathematical reasoning, is
                        available in the Academic & Technical Writing section of the website.
                    </p>
                </div>
            </a>
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
