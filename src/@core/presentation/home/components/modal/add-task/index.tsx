"use client";

import { useState } from "react";

import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useTask } from "@/@core/presentation/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { validationSchema } from "../task-schema";
import { taskTags } from "../../../utils";

import { Form, Input, Modal, Button, Wrapper } from "@/components";

import { FormData, IAddTaskProps } from "../interfaces";
import { useUserContext } from "@/providers";
import { swalModal } from "@/utils";

export function AddTask() {
  const { fetcher } = useTask();
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

  async function handleOnSubmit(data: FormData) {
    if (isSubmitting) return;

    try {
      const payload = {
        ...data,
        userID: user?._id || "",
        isFinished: false,
      };

      await fetcher.create(payload);
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
          <h3>Nova Tarefa</h3>

          <Button
            color="secondary"
            size="xlarge"
            onClick={closeModal}
            background="transparent"
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
              <Input.Label>Prazo entrega</Input.Label>

              <Input.Wrapper>
                <Input.Field
                  {...register("endDate")}
                  type="datetime-local"
                  placeholder="Prazo entrega"
                />
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

          <Button loading={isSubmitting} type="submit">
            Nova Tarefa
          </Button>
        </Form.Root>
      </Modal>
    </>
  );
}
