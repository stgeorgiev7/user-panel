export interface State {
  selectedUser: UserInterface;
  allUsers: UserInterface[];
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
}

export interface EditUserModalInterface {
  visible: boolean;
}

export interface UserPostsInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}
