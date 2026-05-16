import { z } from "zod";

export const createAccountSchema = z.object({
  nome: z
    .string()
    .min(2, "O nome precisa ter pelo menos 2 caracteres")
    .max(16, "O nome precisa ter no máximo 16 caracteres"),
  sobrenome: z
    .string()
    .min(2, "O sobrenome precisa ter pelo menos 2 caracteres")
    .max(40, "O sobrenome precisa ter no máximo 40 caracteres"),
  email: z.email("O email informado é inválido"),
  password: z
    .string()
    .min(2, "A senha precisa ter pelo menos 2 caracteres")
    .max(40, "A senha precisa ter no máximo 40 caracteres"),
});
