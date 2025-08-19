import { z } from "zod";
import { taskTagValidator } from "../../utils";

export const validationSchema = z.object({
  tag: z.string().min(1, "Campo obrigatório").refine(taskTagValidator, {
    message: "Tag inválida",
  }),

  endDate: z
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
  color: z.string(),
  // .max(new Date("2050-01-01"), "Data inválida"),
  // startDate: z
  //   .string()
  //   .min(1, "Campo obrigatório")
  //   .refine(
  //     (value) => {
  //       const date = new Date(value);
  //       return !isNaN(date.getTime());
  //     },
  //     {
  //       message: "Data inválida",
  //     }
  //   ),  color: z.string(),
  title: z
    .string()
    .min(1, "Campo obrigatório")
    .max(30, "O título deve ter no máximo 30 caracteres"),
  description: z
    .string()
    .max(829, "A descricão deve ter no máximo 165 caracteres"),
});
