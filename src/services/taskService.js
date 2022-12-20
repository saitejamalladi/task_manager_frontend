import axios from "../utils/axios";
import { AUTH_TOKEN } from "../constants";

export function createTask(name) {
  return new Promise((resolve, reject) => {
    let requestHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
      },
    };
    let taskRequest = {
      name: name,
    };
    axios
      .post("/tasks", taskRequest, requestHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function listTasks(searchText) {
  return new Promise((resolve, reject) => {
    let requestHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
      },
    };
    axios
      .get(`/tasks?__search=${searchText}`, requestHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function updateTask(task) {
  return new Promise((resolve, reject) => {
    let requestHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
      },
    };
    axios
      .put(`/tasks/${task.id}`, task, requestHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function removeTask(taskId) {
  return new Promise((resolve, reject) => {
    let requestHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
      },
    };
    console.log("remove");
    axios
      .delete(`/tasks/${taskId}`, requestHeader)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
