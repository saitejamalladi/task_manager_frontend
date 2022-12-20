import axios from "axios";

export default axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://task-manager-backend.herokuapp.com/",
  validateStatus: (status) => status < 500,
});
