import { State } from "../types";

export const initialState: State = {
  selectedUser: {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lgn: "",
      },
    },
  },
};
