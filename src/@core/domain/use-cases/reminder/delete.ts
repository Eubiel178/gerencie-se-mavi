import { IReminder } from "./reminder";

export type DeleteReminder = {
  delete: (params: DeleteReminder.Params) => Promise<void>;
};

export namespace DeleteReminder {
  export type Params = Pick<IReminder, "_id">;
}
