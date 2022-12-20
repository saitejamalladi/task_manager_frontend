import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const username = localStorage.getItem(AUTH_TOKEN);

  if (!username) {
    return <Redirect to="/auth/sign-in" />;
  }

  return children;
}

export default AuthGuard;
