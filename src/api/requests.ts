import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export const fetchUserData = () => {
  return axios.get(baseUrl + "users");
};
