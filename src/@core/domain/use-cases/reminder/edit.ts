import { IReminder } from "./reminder";

export type EditReminder = {
  edit: (params: EditReminder.Params) => Promise<any>;
};

export namespace EditReminder {
  export type Params = IReminder;
}
