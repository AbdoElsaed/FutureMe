import Styles from "../styles/Layout.module.css";
import { useState, useMemo, useEffect } from "react";
import Meta from "./Meta";
import Header from "./Header";

import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Divider } from "@mui/material";
import { SnackbarProvider } from "notistack";

const Layout = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeColor, setThemeColor] = useState("dark");

  useEffect(() => {
    const storedThemeMode = localStorage.getItem("themeMode");
    const preferredThemeMode = prefersDarkMode ? "dark" : "light";
    setThemeColor(storedThemeMode ? storedThemeMode : preferredThemeMode);
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeColor,
        },
      }),
    [themeColor]
  );

  return (
    <>
      <Meta />
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header themeColor={themeColor} setThemeColor={setThemeColor} />
          <Divider />
          {children}
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
};

export default Layout;
