import { z } from "zod";

/*
{
    email: '',
    senha: '',
    nome: '',
    sobrenome: '',
    idade: 10000
}
*/

const createAccountSchema = z
  .object({
    nome: z
      .string()
      .min(2, "O nome precisa ter pelo menos 2 caracteres")
      .max(16, "O nome precisa ter no máximo 16 caracteres"),
    sobrenome: z
      .string()
      .min(2, "O sobrenome precisa ter pelo menos 2 caracteres")
      .max(40, "O sobrenome precisa ter no máximo 40 caracteres"),
    email: z.email("O email informado é inválido"),
    idade: z.int().min(1).max(130),
  })
  .strict();

const teste = {
  nome: "duda",
  sobrenome: "velho",
  email: "fsdfsdfo@gmail.com",
  idade: 150,
};

const resposta = createAccountSchema.safeParse(teste);
console.log(resposta);

const infos = {
  idade: 10,
  gostaDeGatos: true,
};

const pessoa = {
  nome: "duda",
  sobrenome: "velho",
  ...infos,
};
