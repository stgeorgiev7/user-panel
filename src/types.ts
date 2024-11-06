export interface userInterface {
  id: number;
  name: string;
  username: string;
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
