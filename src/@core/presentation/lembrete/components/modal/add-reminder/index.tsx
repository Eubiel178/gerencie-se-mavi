"use client";

import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { validationSchema } from "./reminder-schema"; // você pode criar outro schema específico para lembrete
import { Form, Input, Modal, Button, Wrapper } from "@/components";
import { useUserContext } from "@/providers";
import { useReminder } from "@/@core/presentation/hooks";
import { swalModal } from "@/utils";
import { z } from "zod";

type FormData = z.infer<typeof validationSchema>;

export function AddReminder() {
  const { fetcher } = useReminder();
  const { user, mutate } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const {
    reset,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(validationSchema), // ou outro schema se quiser mais simples
    defaultValues: {
      title: "",
      description: "",
      remindAt: "",
      color: "#4b5563",
    },
  });

  function closeModal() {
    setIsOpen(false);
    reset({});
  }

  async function handleOnSubmit(data: FormData) {
    if (isSubmitting) return;
    let permission = Notification.permission;

    if (permission !== "granted") {
      swalModal({
        icon: "error",
        title: "Voce precisa permitir notificacoes para criar um lembrete!",
      });

      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") return;

    try {
      const payload = {
        ...data,
        userID: user?._id || "",
      };

      await fetcher.create(payload);
      await mutate();

      swalModal({
        icon: "success",
        title: "Lembrete criado com sucesso!",
      });

      closeModal();
    } catch (error) {
      swalModal({
        icon: "error",
        title: "Erro ao criar lembrete!",
      });
    }
  }

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg text-sm bg-green-500"
      >
        Novo Lembrete
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Wrapper justify="between" align="center">
          <h3 className="">
            <strong>Novo Lembrete</strong>
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
            {/* <Input.Root sharedProps={{ error: errors.color?.message }}>
              <Input.Label>Marcador</Input.Label>

              <Input.Wrapper>
                <Input.Color {...register("color")} />
              </Input.Wrapper>

              <Input.HelperText />
            </Input.Root> */}

            <Input.Root sharedProps={{ error: errors.title?.message }}>
              <Input.Wrapper>
                <Input.Field
                  {...register("title")}
                  placeholder="Título do Lembrete"
                />
              </Input.Wrapper>
              <Input.HelperText />
            </Input.Root>

            <Input.Root sharedProps={{ error: errors.description?.message }}>
              <Input.Wrapper>
                <Input.FieldTextarea
                  {...register("description")}
                  rows={7}
                  placeholder="Descrição do Lembrete"
                />
              </Input.Wrapper>
              <Input.HelperText />
            </Input.Root>

            <Input.Root sharedProps={{ error: errors.remindAt?.message }}>
              <Input.Label>Lembrar em</Input.Label>
              <Input.Wrapper>
                <Input.Date type="date" {...register("remindAt")} />
              </Input.Wrapper>
              <Input.HelperText />
            </Input.Root>
          </Form.Wrapper>

          <Button loading={isSubmitting} type="submit">
            Criar Lembrete
          </Button>
        </Form.Root>
      </Modal>
    </>
  );
}
