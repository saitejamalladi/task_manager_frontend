import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import Header from "../components/AppBar";

import { CssBaseline, Paper as MuiPaper, withWidth } from "@material-ui/core";

import { isWidthUp } from "@material-ui/core/withWidth";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.palette.background.default};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const MainContent = styled(MuiPaper)`
  padding: 2rem 0;
  flex: 1;
  background-color: #f4f4f6;
  border-radius: 0;

  @media (min-width: 600px) {
    padding: 2rem 6rem;
  }
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }
`;

const Dashboard = ({ children, routes, width }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <AppContent>
        <Header onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isWidthUp("lg", width) ? 12 : 5}>
          {children}
        </MainContent>
      </AppContent>
    </Root>
  );
};

export default withWidth()(Dashboard);
