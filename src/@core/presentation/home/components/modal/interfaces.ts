import { z } from "zod";

import { validationSchema } from "@/@core/presentation/home/components/modal/task-schema";

import { ITask } from "@/@core/domain";

export interface FormData extends z.infer<typeof validationSchema> {}

export interface IEditTaskProps {
  selectedTask?: ITask;
  setSelectedTask: React.Dispatch<React.SetStateAction<ITask | undefined>>;
}

export interface IAddTaskProps {
  buttonText: string;
}
