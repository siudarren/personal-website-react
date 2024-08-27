import React from "react";
import {Link} from "react-router-dom";
import DarkModeToggle from "/src/components/DarkModeToggle.jsx"; // Import DarkModeButton
import "/src/css/Header.css";

function Header() {
    return (
        <header className="header">
            <h1 className="home">
                <Link to="/">darren siu</Link>
            </h1>
            <DarkModeToggle />
        </header>
    );
}

export default Header;
