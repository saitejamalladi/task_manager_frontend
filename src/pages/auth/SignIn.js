import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "../../redux/actions/authActions";

import {
  Button,
  Grid,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { AUTH_TOKEN } from "../../constants";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BrandTitle = styled(Typography)`
  text-transform: uppercase;
  color: orange;
  font-size: 24px;
  text-align: center;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
`;

function SignIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token && location.pathname === "/auth/sign-in") {
    history.push("/");
  }

  return (
    <Wrapper>
      <Helmet title="Sign In" />
      <Grid container direction={"column"} justify="center" alignItems="center">
        <BrandTitle variant="body1" gutterBottom>
          Task Manager
        </BrandTitle>
      </Grid>
      <Typography component="h2" variant="body1" align="center">
        Login to your account to continue
      </Typography>

      <Formik
        initialValues={{
          name: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("name is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await dispatch(signIn(values.name));

            history.push("/");
          } catch (error) {
            const message =
              error["display_msg"] || error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="text"
              name="name"
              label="Name"
              value={values.name}
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignIn;
