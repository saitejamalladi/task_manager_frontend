import React from "react";
import { useSelector } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";

import { ThemeProvider } from "styled-components/macro";
import { create } from "jss";

import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  jssPreset,
} from "@material-ui/core/styles";

import createTheme from "./theme";
import Routes from "./routes/Routes";

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point"),
});

function App() {
  const theme = useSelector((state) => state.themeReducer);

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet titleTemplate="%s | Task Manager" defaultTitle="Task Manager" />
        <StylesProvider jss={jss}>
          <MuiThemeProvider theme={createTheme(theme.currentTheme)}>
            <ThemeProvider theme={createTheme(theme.currentTheme)}>
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </HelmetProvider>
    </React.Fragment>
  );
}

export default App;
