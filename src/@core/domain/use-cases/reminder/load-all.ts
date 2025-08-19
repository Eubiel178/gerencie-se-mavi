import { IReminder } from "./reminder";

export type LoadAllReminders = {
  loadAll: (params: LoadAllReminders.Params) => Promise<LoadAllReminders.Model>;
};

export namespace LoadAllReminders {
  export type Params = Pick<IReminder, "userID">;

  export type Model = IReminder[];
}
