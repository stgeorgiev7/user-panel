export interface State {
  usersState: {
    allUsers: UserInterface[];
    selectedUser: UserInterface | null;
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  tasksState: {
    tasks: TaskInterface[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  posts: {
    currentUserPosts: UserPostsInterface[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  components: ComponentsInterface;
}

export interface UserInterface {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lgn?: string;
    };
  };
}

export interface ComponentsInterface {
  editUserModal: EditUserModalInterface;
  errorModal: ErrorModalInterface;
}

export interface EditUserModalInterface {
  visible: boolean;
}

export interface ErrorModalInterface {
  visible: boolean;
  message: string | null;
}

export interface UserPostsInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface TaskInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskFilterInterface {
  userId: number | null;
  completed: boolean | null;
  title: string | null;
}
