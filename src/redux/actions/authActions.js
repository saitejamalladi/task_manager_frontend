import * as types from "../../constants";
import {
  signIn as authSignIn,
  signOut as authSignOut,
} from "../../services/authService";

export function signIn(name) {
  return async (dispatch) => {
    return authSignIn(name)
      .then((response) => {
        dispatch({
          type: types.AUTH_SIGN_IN,
          name: response.token.name,
          image: response.image,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}
export function signOut() {
  authSignOut();
  return {
    type: types.AUTH_SIGN_OUT,
  };
}
