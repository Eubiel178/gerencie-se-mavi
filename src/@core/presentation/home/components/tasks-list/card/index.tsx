import { tv } from "tailwind-variants";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

import { useTask } from "@/@core/presentation/hooks/use-task";
import { Button, Paragraph, Wrapper, DefaultLink } from "@/components";
import { ITask } from "@/@core/domain";
import { swalModal } from "@/utils";
import { useUserContext } from "@/providers";

const styles = tv({
  slots: {
    container:
      "bg-white flex flex-col flex-1 min-h-[300px] shadow rounded-lg overflow-hidden",
    title: "text-base font-medium",
  },
});

export function Card({
  task,
  setSelectedTask,
}: {
  task: ITask;
  setSelectedTask: (task: ITask) => void;
}) {
  const tv = styles();
  const { fetcher } = useTask();
  const { mutate } = useUserContext();
  const [showFullDescription, setShowFullDescription] = useState(false);

  async function handleTaskRemove() {
    try {
      const { isConfirmed } = await swalModal({
        title: "Tem certeza?",
        text: `Voce realmente deseja excluir a tarefa ${task.title}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Nao, cancelar!",
      });

      if (isConfirmed) {
        await fetcher.delete({ _id: task._id });
        await mutate();
        await swalModal({
          icon: "success",
          title: "Tarefa excluida com sucesso!",
        });
      }
    } catch (error) {
      console.log(error);
      swalModal({
        icon: "error",
        title: "Erro ao excluir tarefa!",
      });
    }
  }

  const MAX_LENGTH = 230; // limite de caracteres antes de mostrar "ler mais"
  const descriptionToShow =
    !showFullDescription && task.description.length > MAX_LENGTH
      ? task.description.slice(0, MAX_LENGTH) + "..."
      : task.description;

  return (
    <li key={task._id} className={tv.container({})}>
      <Wrapper
        align="start"
        background="dark"
        className="h-32 "
        style={{
          background: task?.color,
        }}
      >
        <Wrapper flex="flex1" justify="between" align="center" padding="small">
          <Paragraph size="small" className="text-white">
            #{task.tag}
          </Paragraph>

          <Wrapper gap="medium">
            <Button
              color="primary"
              background="transparent"
              size="xlarge"
              onClick={() => setSelectedTask(task)}
            >
              <FaEdit />
            </Button>

            <Button
              color="danger"
              background="transparent"
              size="xlarge"
              onClick={handleTaskRemove}
            >
              <FaTrash />
            </Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <Wrapper
        direction="column"
        justify="between"
        flex="flex1"
        padding="medium"
      >
        <Wrapper direction="column" gap="medium">
          <div>
            <h3 className={tv.title()}>{task.title}</h3>
            {task?.createdAt && (
              <p className="text-sm  text-gray-600">
                <span className="font-semibold">criada em:</span>
                {new Date(task?.createdAt as any)?.toLocaleDateString()}
              </p>
            )}
            {task?.endDate && (
              <p className="text-sm  text-gray-600">
                <span className="font-semibold"> entrega até:</span>:
                {new Date(task?.endDate as any)?.toLocaleDateString()}
              </p>
            )}
          </div>

          <Paragraph color="secondary" size="small">
            {descriptionToShow}
            {task.description.length > MAX_LENGTH && (
              <button
                className="ml-1 text-blue-500 underline"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "mostrar menos" : "ler mais"}
              </button>
            )}
          </Paragraph>
        </Wrapper>

        {/* <DefaultLink href={"/home/" + task._id}>Acessar</DefaultLink> */}
      </Wrapper>
    </li>
  );
}
