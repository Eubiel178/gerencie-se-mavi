import { IUser } from "./user";

export type CreateUser = {
  create: (params: CreateUser.Params) => Promise<any>;
};

export namespace CreateUser {
  export type Params = IUser;
}
