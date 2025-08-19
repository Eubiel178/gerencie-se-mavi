"use client";

import { useEffect, useState } from "react";

import { FaEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { validationSchema } from "@/@core/presentation/home/components/modal/task-schema";

import { Form, Modal, Input, Button, Wrapper } from "@/components";

import { FormData, IEditTaskProps } from "../interfaces";
import { taskTags } from "../../../utils";
import { useTask } from "@/@core/presentation/hooks";
import { swalModal } from "@/utils";
import { useUserContext } from "@/providers";

export function EditTask({ selectedTask, setSelectedTask }: IEditTaskProps) {
  const { fetcher } = useTask();
  const { mutate } = useUserContext();
  console.log(selectedTask, "selecione taskes");

  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
    defaultValues: selectedTask,
  });

  function closeModal() {
    reset({});
    setSelectedTask(undefined);
  }

  async function handleOnSubmit(data: FormData) {
    if (isSubmitting) return;

    try {
      const payload = {
        ...selectedTask,
        ...data,
      };

      await fetcher.edit(payload);
      await mutate();

      swalModal({
        icon: "success",
        title: "Tarefa editada com sucesso!",
      });

      closeModal();
    } catch (error) {
      console.log(error);

      swalModal({
        icon: "error",
        title: "Erro ao editar tarefa!",
      });
    }
  }

  return (
    <>
      <Modal isOpen={!!selectedTask} onClose={closeModal}>
        <Wrapper justify="between" align="center">
          <h3>Editar Tarefa</h3>

          <Button
            background="transparent"
            color="secondary"
            size="xlarge"
            onClick={closeModal}
            className="rounded-lg"
          >
            <MdClose />
          </Button>
        </Wrapper>

        <Form.Root onSubmit={handleSubmit(handleOnSubmit)}>
          <Form.Wrapper gap="xsmall">
            <Input.Root sharedProps={{ error: errors.color?.message }}>
              <Input.Label>Cor de destaque</Input.Label>

              <Input.Wrapper>
                <Input.Color {...register("color")} />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root>

            <Input.Root sharedProps={{ error: errors.endDate?.message }}>
              <Input.Wrapper>
                <Input.Field
                  {...register("endDate")}
                  type="datetime-local"
                  placeholder="Prazo entrega"
                  defaultValue={selectedTask?.endDate}
                />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root>

            <Input.Root sharedProps={{ error: errors.tag?.message }}>
              <Input.Label>Tipo de Tarefa</Input.Label>

              <Input.Wrapper>
                <Input.FieldSelect
                  {...register("tag")}
                  optionsArray={taskTags}
                />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root>

            <Input.Root sharedProps={{ error: errors.title?.message }}>
              <Input.Wrapper>
                <Input.Field
                  {...register("title")}
                  placeholder="Título da Tarefa"
                />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root>

            <Input.Root sharedProps={{ error: errors.description?.message }}>
              <Input.Wrapper>
                <Input.FieldTextarea
                  {...register("description")}
                  className="max-h-40"
                  rows={5}
                  placeholder="Descrição da Tarefa"
                />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root>
          </Form.Wrapper>

          <Button loading={isSubmitting}>Salvar Alterações</Button>
        </Form.Root>
      </Modal>
    </>
  );
}
