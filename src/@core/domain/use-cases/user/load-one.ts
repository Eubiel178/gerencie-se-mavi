import { IUser } from "./";

export type LoadOneUser = {
  loadOne: (params: LoadOneUser.Params) => Promise<any>;
};

export namespace LoadOneUser {
  export type Params = Pick<IUser, "_id">;

  export type Model = IUser;
}
