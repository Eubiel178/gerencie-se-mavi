"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/validation/registerSchema";

import { tv } from "tailwind-variants";

import {
  Form,
  Input,
  Button,
  Wrapper,
  Paragraph,
  DefaultLink,
} from "@/components";
import { useUser } from "@/@core/presentation/hooks";
import { swalModal } from "@/utils";
import { useRouter } from "next/navigation";

const styles = tv({
  base: "p-8 flex flex-col gap-16",
});

type FormData = z.input<typeof validationSchema>;

export function Auth() {
  const router = useRouter();
  const { fetcher } = useUser();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleOnSubmit = async (data: FormData) => {
    try {
      // Cria o usuário
      await fetcher.create(data);

      // Faz login automático
      await fetcher.auth(data);

      // Se tudo deu certo
      swalModal({
        icon: "success",
        title: "Cadastro efetuado com sucesso!",
        text: "Você será redirecionado para a página inicial",
      });

      router.push("/home");
    } catch (error: any) {
      console.log(error);

      swalModal({
        icon: "error",
        title: error?.response?.data?.errorMessage || "Algo deu errado!",
      });
    }
  };

  return (
    <section className={styles()}>
      <h1>Cadastre-se</h1>

      <Form.Root onSubmit={handleSubmit(handleOnSubmit)}>
        <Form.Wrapper>
          <Input.Root
            sharedProps={{
              error: errors.name?.message,
            }}
          >
            <Input.Wrapper>
              <Input.Field
                {...register("name")}
                placeholder="Seu nome aqui"
                autoFocus
              />
            </Input.Wrapper>

            <Input.HelperText />
          </Input.Root>

          <Input.Root sharedProps={{ error: errors.email?.message }}>
            <Input.Wrapper>
              <Input.Field
                {...register("email")}
                type="email"
                placeholder="Seu email aqui"
              />
            </Input.Wrapper>

            <Input.HelperText />
          </Input.Root>

          <Input.Root sharedProps={{ error: errors.use_type?.message }}>
            <Input.Wrapper>
              <Input.FieldSelect
                placeholder="Selecione o tipo de uso"
                {...register("use_type")}
                optionsArray={[
                  {
                    label: "Estudo",
                    value: "Estudo",
                  },
                  {
                    label: "Trabalho",
                    value: "Trabalho",
                  },
                  {
                    label: "Estudo e Trabalho",
                    value: "Estudo e Trabalho",
                  },
                  {
                    label: "Outros",
                    value: "Outros",
                  },
                ]}
              />
            </Input.Wrapper>

            <Input.HelperText />
          </Input.Root>

          <Input.Root sharedProps={{ error: errors.password?.message }}>
            <Input.Wrapper>
              <Input.FieldPassword
                {...register("password")}
                placeholder="Sua senha aqui"
              />
            </Input.Wrapper>

            <Input.HelperText />
          </Input.Root>

          <Input.Root
            sharedProps={{ error: errors.password_confirmation?.message }}
          >
            <Input.Wrapper>
              <Input.FieldPassword
                {...register("password_confirmation")}
                placeholder="Confirme sua senha aqui"
              />
            </Input.Wrapper>

            <Input.HelperText />
          </Input.Root>
        </Form.Wrapper>

        <Button loading={isSubmitting}>Cadastrar</Button>
      </Form.Root>

      <Wrapper align="center" gap="small">
        <Paragraph>Já tem uma conta?</Paragraph>

        <DefaultLink href="/login">Logar</DefaultLink>
      </Wrapper>
    </section>
  );
}
