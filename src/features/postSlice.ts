import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialState } from "../store/initialState";
import { UserPostsInterface } from "../types";
import {
  fetchUserPosts,
  updateUserPost,
  deleteUserPost,
} from "../api/requests";
import type { RootState } from "../store/store";

export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser",
  async (userId: number) => {
    const response = await fetchUserPosts(userId);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: UserPostsInterface) => {
    const response = await updateUserPost(post);
    return JSON.parse(response.data.body);
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number) => {
    await deleteUserPost(postId);
    return postId;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: initialState.posts,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUserPosts = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch posts";
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const editedPost = action.payload;
        const postArr = state.currentUserPosts?.map((post) =>
          post.id === editedPost.id ? { ...post, ...editedPost } : post
        );
        state.currentUserPosts = postArr;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update post";
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const postArr = state.currentUserPosts.filter(
          (post) => post.id !== action.payload
        );
        state.currentUserPosts = postArr;
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete post";
      });
  },
});

export const selectPostStatus = (state: RootState) => state.posts.status;
export const selectCurrentUserPosts = (state: RootState) =>
  state.posts.currentUserPosts;
export const selectPostError = (state: RootState) => state.posts.error;

export default postSlice.reducer;
