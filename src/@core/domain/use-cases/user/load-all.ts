import { IUser } from "./user";

export type LoadAllUsers = {
  loadAll: (params: LoadAllUsers.Params) => Promise<LoadAllUsers.Model>;
};

export namespace LoadAllUsers {
  export type Params = {};

  export type Model = IUser[];
}
