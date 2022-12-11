import React from "react";
import { ThemeConsumer } from "../context/ThemeContext";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <button className="toggle-theme" onClick={toggleTheme}>
            {theme === "dark" ? <MdDarkMode /> : <MdOutlineDarkMode />}
          </button>
        );
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
