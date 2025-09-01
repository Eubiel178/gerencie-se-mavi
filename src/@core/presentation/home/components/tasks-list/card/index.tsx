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
      "bg-white flex flex-col flex-1 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200",
    title: "text-lg font-semibold text-gray-800",
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
      {/* Header colorido */}
      <div
        className="flex justify-between items-center px-4 py-2"
        style={{ background: task.color || "#4f46e5" }}
      >
        <Paragraph size="small" className="text-white font-medium">
          #{task.tag}
        </Paragraph>
        <div className="flex gap-2">
          <Button
            color="primary"
            background="transparent"
            size="xlarge"
            onClick={() => setSelectedTask(task)}
            className="text-white hover:text-gray-200"
          >
            <FaEdit />
          </Button>
          <Button
            color="danger"
            background="transparent"
            size="xlarge"
            onClick={handleTaskRemove}
            className="hover:text-red-700 text-red-500"
          >
            <FaTrash />
          </Button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className={tv.title()}>{task.title}</h3>

        {/* Datas */}
        <div className="flex flex-col gap-1 text-sm text-gray-600">
          {task?.createdAt && (
            <p>
              <span className="font-semibold">Criada em:</span>{" "}
              {new Date(task.createdAt).toLocaleDateString("pt-BR")}
            </p>
          )}
          {task?.endDate && (
            <p>
              <span className="font-semibold">Entrega até:</span>{" "}
              {new Date(task.endDate).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>

        {/* Descrição */}
        <Paragraph color="secondary" size="small">
          {descriptionToShow}
          {task.description.length > MAX_LENGTH && (
            <button
              className="ml-1 text-blue-500 underline hover:text-blue-700"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "mostrar menos" : "ler mais"}
            </button>
          )}
        </Paragraph>
      </div>
    </li>
  );
}
