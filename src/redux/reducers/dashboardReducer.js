import * as types from "../../constants";

const initialState = {
  tasksCompleted: 0,
  totalTasks: 0,
  latestTasks: [],
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.DASHBOARD_DATA:
      return {
        ...state,
        tasksCompleted: actions.tasksCompleted,
        totalTasks: actions.totalTasks,
        latestTasks: actions.latestTasks,
      };

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        tasksCompleted: 0,
        totalTasks: 0,
        latestTasks: [],
      };

    default:
      return state;
  }
}
