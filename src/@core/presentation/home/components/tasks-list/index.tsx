"use client";

import { useEffect, useState } from "react";
import { useParamsUrl } from "@/@core/presentation/hooks";

import { List, Wrapper, Feedback } from "@/components";
import { useUserContext } from "@/providers";
import { Card } from "./card";

import { taskTagValidator } from "../../utils";
import { ITask } from "@/@core/domain";
import { EditTask } from "../modal";

export function TasksList() {
  const { tasks, user } = useUserContext();
  const paramsUrl = useParamsUrl();
  const tag = paramsUrl?.get("tag");
  const [tasksFiltred, setTasksFiltred] = useState<ITask[]>([]);
  const [selectedTask, setSelectedTask] = useState<ITask | undefined>();

  // Filtra as tarefas dinamicamente sempre que tasks ou tag mudarem
  useEffect(() => {
    if (taskTagValidator(tag)) {
      const filtered =
        tasks?.filter(
          (task) => task?.tag?.toLowerCase() === tag?.toLowerCase()
        ) ?? [];

      setTasksFiltred([...filtered]);
    } else {
      setTasksFiltred([...(tasks ?? [])]);
    }
  }, [tasks, tag]);
  return (
    <>
      {tasksFiltred && tasksFiltred.length > 0 ? (
        <List
          direction="row"
          wrap="wrap"
          className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 sm:gap-5 gap-3 tasks-list"
        >
          {tasksFiltred.map((task) => (
            <Card
              key={task?._id}
              task={task}
              setSelectedTask={setSelectedTask}
            />
          ))}

          {selectedTask && (
            <EditTask
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          )}
        </List>
      ) : (
        <Wrapper>
          <Feedback>
            <p
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html:
                  tag === "todos" || !!tag
                    ? "<span>Nenhuma tarefa encontrada</span>"
                    : `<span>Nenhuama tarefa na categoria <strong>${tag}</strong> encontrada</span>`,
              }}
            />
          </Feedback>
        </Wrapper>
      )}
    </>
  );
}
