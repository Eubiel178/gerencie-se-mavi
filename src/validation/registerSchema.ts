import { z } from "zod";

export const validationSchema = z
  .object({
    name: z.string().min(1, "Campo obrigatório"),
    use_type: z.string().min(1, "Campo obrigatório"),
    email: z
      .string()
      .min(1, "Campo obrigatório")
      .email({ message: "Informe um email válido" }),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    password_confirmation: z.string().min(1, "Campo obrigatório"),
  })
  .refine(
    ({ password, password_confirmation }) => password === password_confirmation,
    {
      message: "As senhas não coincidem",
      path: ["password_confirmation"],
    }
  );
