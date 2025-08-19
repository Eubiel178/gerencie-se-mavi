import { IUser } from "./";

export type NotificationUser = {
  notification: (params: NotificationUser.Params) => Promise<any>;
};

export namespace NotificationUser {
  export type Params = Pick<IUser, "_id"> & {
    subscription: PushSubscription;
  };
}
