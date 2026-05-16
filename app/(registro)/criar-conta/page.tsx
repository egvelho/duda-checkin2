"use client";
import { createAccountSchema } from "@/schemas/create-account-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createAccountSchema),
    mode: "onBlur",
  });

  async function onSubmit(values) {
    const response = await fetch("/api/create-account", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();
    alert(responseJson.info);
    alert(JSON.stringify(responseJson.dados));
  }

  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nome"
          className="border rounded-md p-2"
          {...register("nome")}
        />
        {errors.nome && (
          <span className="text-red-500">{errors.nome.message}</span>
        )}
        <input
          type="text"
          placeholder="Sobrenome"
          className="border rounded-md p-2"
          {...register("sobrenome")}
        />
        {errors.sobrenome && (
          <span className="text-red-500">{errors.sobrenome.message}</span>
        )}
        <input
          type="text"
          placeholder="Email"
          className="border rounded-md p-2"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="Senha"
          className="border rounded-md p-2"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <input
          type="password"
          placeholder="Confirmar senha"
          className="border rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-amber-600 text-white text-bold rounded-md p-2"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
