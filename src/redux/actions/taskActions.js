import * as types from "../../constants";
import {
  createTask as createTaskService,
  listTasks as listTasksService,
  removeTask as removeTaskService,
} from "../../services/taskService";

export function createTask(name) {
  return async () => {
    createTaskService(name)
      .then((response) => {
        console.log("Task Created");
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function listTasks(searchText) {
  return async (dispatch) => {
    return listTasksService(searchText)
      .then((response) => {
        dispatch({
          type: types.TASK_DATA,
          tasks: response,
        });
      })
      .catch((error) => {
        throw error;
      });
  };
}
