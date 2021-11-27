import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import styles from "../styles/ThemeToggle.module.css";

const ThemeToggle = ({ themeColor, setThemeColor }) => {
  const handleClick = () => {
    const prevTheme = themeColor;
    setThemeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
    localStorage.setItem("themeMode", prevTheme === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <IconButton
        title={
          themeColor === "dark" ? "switch to light mode" : "switch to dark mode"
        }
        // className={styles.themeToggleBtn}
        style={{ border: '2px solid chocolate' }}
        aria-label="Theme Toggle"
        onClick={handleClick}
      >
        {themeColor === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </div>
  );
};

export default ThemeToggle;
