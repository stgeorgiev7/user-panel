import axios from "axios";
import { UserPostsInterface } from "../types";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export const fetchUserData = () => {
  return axios.get(baseUrl + "users");
};

export const fetchUserPosts = (userId: number) => {
  return axios.get(baseUrl + "posts/?userId=" + userId);
};

export const updateUserPost = (post: UserPostsInterface) => {
  return axios.put(baseUrl + "posts/" + post.id, {
    body: JSON.stringify(post),
    headers: ["application/json", "charset=UTF-8"],
  });
};

export const deleteUserPost = (postId: number) => {
  return axios.delete(baseUrl + "posts/" + postId);
};
