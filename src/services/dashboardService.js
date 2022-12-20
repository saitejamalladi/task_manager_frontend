import axios from "../utils/axios";
import { AUTH_TOKEN } from "../constants";

export function getDashboardData() {
  return new Promise((resolve, reject) => {
    let requestHeader = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN),
      },
    };
    axios
      .get("/dashboard", requestHeader)
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
