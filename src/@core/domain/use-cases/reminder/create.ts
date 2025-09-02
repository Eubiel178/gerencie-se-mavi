import { IReminder } from "./reminder";

export type CreateReminder = {
  create: (params: CreateReminder.Params) => Promise<any>;
};

export namespace CreateReminder {
  export type Params = Omit<
    IReminder,
    "_id" | "notificado" | "remindedAt" | "createdAt"
  >;
}
