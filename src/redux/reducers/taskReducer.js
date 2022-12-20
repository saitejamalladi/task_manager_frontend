import * as types from "../../constants";

const initialState = {
  tasks: [],
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.TASK_DATA:
      return {
        ...state,
        tasks: actions.tasks,
      };

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        tasks: [],
      };

    default:
      return state;
  }
}
