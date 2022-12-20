import * as types from "../../constants";

export default function reducer(state = {}, actions) {
  switch (actions.type) {
    case types.AUTH_SIGN_IN:
      return {
        ...state,
        user: {
          id: actions.id,
          name: actions.name,
          image: actions.image,
        },
      };

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
