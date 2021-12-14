import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import styles from "../styles/Header.module.css";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import { isMobile } from "react-device-detect";

const Header = ({ themeColor, setThemeColor }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <div
      className={isMobile ? styles.headerContainerMobile : styles.headerContainer}
    >
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a>
              <Image
                className={styles.logo}
                src={mode === "dark" ? "/logo-blue.png" : "/logo-black.png"}
                alt="Logo"
                width="200"
                height="100"
              ></Image>
            </a>
          </Link>
        </div>
        <div className={isMobile ? styles.publicLinkMobile : styles.publicLink}>
          <Link href="/public">
            <a className={mode === "dark" ? styles.darkFont : styles.lightFont}>
              Public Letters
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.themeToggle}>
          <ThemeToggle themeColor={themeColor} setThemeColor={setThemeColor} />
        </div>
        <div className={styles.githubLink} title="github">
          <Link href="https://github.com/AbdoElsaed/FutureMe">
            <a>
              <GitHubIcon
                className={mode === "dark" ? styles.darkIcon : styles.lightIcon}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
