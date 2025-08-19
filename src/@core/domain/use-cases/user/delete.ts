import { IUser } from "./user";

export type DeleteUser = {
  delete: (params: DeleteUser.Params) => Promise<void>;
};

export namespace DeleteUser {
  export type Params = Pick<IUser, "_id">;
}
