import { ITask } from "./task";

export type EditTask = {
  edit: (params: EditTask.Params) => Promise<any>;
};

export namespace EditTask {
  export type Params = ITask;
}
