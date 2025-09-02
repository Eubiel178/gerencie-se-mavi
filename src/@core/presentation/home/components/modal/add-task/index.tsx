"use client";

import { useState } from "react";

import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useReminder, useTask } from "@/@core/presentation/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { validationSchema } from "../task-schema";
import { taskTags } from "../../../utils";

import { Form, Input, Modal, Button, Wrapper } from "@/components";

import { FormData, IAddTaskProps } from "../interfaces";
import { useUserContext } from "@/providers";
import { swalModal } from "@/utils";

export function AddTask() {
  const { fetcher } = useTask();
  const reminder = useReminder();
  const { user, mutate } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      tag: "",
      title: "",
      description: "",
      color: "#4b5563",
      endDate: "",
    },
  });

  function closeModal() {
    setIsOpen(false);
    reset({});
  }

  //   if (isSubmitting) return;
  // let permission = Notification.permission;

  // if (permission !== "granted") {
  //   swalModal({
  //     icon: "error",
  //     title: "Voce precisa permitir notificacoes para criar um lembrete!",
  //   });

  //   permission = await Notification.requestPermission();
  // }

  // if (permission !== "granted") return;

  // try {
  //   const payload = {
  //     ...data,
  //     userID: user?._id || "",
  //   };

  async function handleOnSubmit(data: FormData) {
    if (isSubmitting) return;
    let permission = Notification.permission;

    if (permission !== "granted") {
      const { isConfirmed } = await swalModal({
        title: "Permissao de notificacoes",
        text: `Para receber notificações desta tarefa, você precisa permitir o envio delas. Deseja continuar sem notificações?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Permitir notificações!",
        cancelButtonText: "Continuar sem notificações!",
      });
      console.log(isConfirmed);

      if (isConfirmed) {
        permission = await Notification.requestPermission();
      }
    }

    try {
      const payload = {
        ...data,
        userID: user?._id || "",
        isFinished: false,
      };
      console.log(data.endDate, "data final");

      const response = await fetcher.create(payload);
      console.log(response);

      await reminder.fetcher.create({
        userID: user?._id,
        title: data.title,
        description: data.description,
        remindAt: data.endDate,
        taskId: response?.task._id,
      } as any);
      mutate();

      swalModal({
        icon: "success",
        title: "Tarefa criada com sucesso!",
      });

      closeModal();
    } catch (error) {
      console.log(error);

      swalModal({
        icon: "error",
        title: "Erro ao criar tarefa!",
      });
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={function () {
          setIsOpen(true);
        }}
        className="rounded-lg text-sm bg-green-500"
      >
        Nova Tarefa
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Wrapper justify="between" align="center">
          <h3>
            <strong>Nova Tarefa</strong>
          </h3>

          <Button
            color="secondary"
            size="xlarge"
            onClick={closeModal}
            background="transparent"
            className="p-0"
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
            <Input.Root sharedProps={{ error: errors.tag?.message }}>
              <Input.Label>Tipo de Tarefa</Input.Label>

              <Input.Wrapper>
                <Input.FieldSelect
                  id="tag"
                  {...register("tag")}
                  optionsArray={taskTags}
                />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root>

            <Input.Root sharedProps={{ error: errors.endDate?.message }}>
              <Input.Label>Prazo entrega</Input.Label>

              <Input.Wrapper>
                <Input.Date
                  {...register("endDate")}
                  type="date"
                  placeholder="Prazo entrega"
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
                  rows={7}
                  placeholder="Descrição da Tarefa"
                />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root>
          </Form.Wrapper>

          <Button loading={isSubmitting} type="submit">
            Nova Tarefa
          </Button>
        </Form.Root>
      </Modal>
    </>
  );
}
