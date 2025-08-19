import { IUser } from "./";

export type AuthUser = {
  create: (params: AuthUser.Params) => Promise<any>;
};

export namespace AuthUser {
  export type Params = Pick<IUser, "email" | "password">;
}
