import React from "react";
import styled, { withTheme } from "styled-components/macro";

import {
  Grid,
  AppBar as MuiAppBar,
  Toolbar,
  ListItem,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";

import { NavLink, useHistory } from "react-router-dom";
import { AUTH_USER_IMAGE, AUTH_USER_NAME } from "../constants";
import { signOut } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
  box-shadow: 0px 3px 6px #00000029;
`;
const BrandName = styled(Typography)`
  margin-left: 5px;
`;

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.header.color};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 76px;
  justify-content: center;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }
`;

const AppBarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const name = localStorage.getItem(AUTH_USER_NAME);
  const image = localStorage.getItem(AUTH_USER_IMAGE);

  const handleSignOut = async () => {
    dispatch(signOut());
    history.push("/auth/sign-in");
  };

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justify={"space-between"} alignItems="center">
            <Grid item xs={"auto"}>
              <Brand component={NavLink} to="/" button>
                <Avatar alt={name} src={image} sx={{ width: 70, height: 70 }} />
                <BrandName variant={"h4"}>{name}</BrandName>
              </Brand>
            </Grid>
            <Grid item>
              <Button onClick={handleSignOut}>Logout</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(AppBarComponent);
