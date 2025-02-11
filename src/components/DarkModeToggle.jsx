import React, {useEffect, useState} from "react";
import "/src/css/Header.css";

const DarkModeToggle = () => {
    // State to track whether dark mode is enabled
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Effect to apply the dark mode based on local storage
    useEffect(() => {
        const darkModeSetting = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(darkModeSetting);
        updateTheme(darkModeSetting);
    }, []);

    // Function to update the theme
    const updateTheme = (darkMode) => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark-mode");
        } else {
            root.classList.remove("dark-mode");
        }
    };

    // Toggle function
    const toggleDarkMode = () => {
        const toggledMode = !isDarkMode;
        setIsDarkMode(toggledMode);
        localStorage.setItem("darkMode", toggledMode);
        updateTheme(toggledMode);
    };

    return (
        <div className="mode_switch">
            <p className="darkMode">{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
            <label className="switch">
                <input type="checkbox" onClick={toggleDarkMode} checked={isDarkMode} readOnly />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default DarkModeToggle;
