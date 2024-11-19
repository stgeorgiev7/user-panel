import { State } from "../types";

export const initialState: State = {
  usersState: {
    allUsers: [],
    status: "idle",
    error: null,
    selectedUser: null,
  },
  tasksState: { tasks: [], status: "idle", error: null },
  components: {
    editUserModal: {
      visible: false,
    },
    errorModal: {
      visible: false,
      message: null,
    },
  },
  posts: {
    currentUserPosts: [],
    status: "idle",
    error: null,
  },
};
