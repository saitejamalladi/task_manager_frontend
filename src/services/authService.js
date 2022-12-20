import axios from "../utils/axios";
import { API_KEY, AUTH_TOKEN, AUTH_USER_IMAGE, AUTH_USER_NAME } from "../constants";

export function signIn(name) {
  return new Promise((resolve, reject) => {
    let authObj = {
      name: name,
      apiKey: API_KEY
    }
    axios
      .post("/login", authObj)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(AUTH_TOKEN, response.data?.token?.token);
          localStorage.setItem(AUTH_USER_NAME, response.data?.token?.name);
          localStorage.setItem(AUTH_USER_IMAGE, response.data?.image);
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signOut() {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_USER_NAME);
  localStorage.removeItem(AUTH_USER_IMAGE);
}