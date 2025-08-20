import { z } from "zod";

export const validationSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  remindAt: z
    .string()
    .min(1, "Campo obrigatório")
    .refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      {
        message: "Data inválida",
      }
    ),
  color: z.string().optional(),
});
