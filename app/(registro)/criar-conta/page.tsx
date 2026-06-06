"use client";

import { createAccountSchema } from "@/schemas/create-account-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { Title } from "@/components/title";
import type { CreateAccountApiResponse } from "@/app/api/create-account/route";

const texts = {
  title: "Criar conta",
  placeholders: {
    name: "Nome",
    surname: "Sobrenome",
    email: "Email",
    password: "Senha",
    confirmPassword: "Confirmar senha",
  },
  errors: {
    confirmPasswordRequired: "A confirmação de senha é obrigatória",
    passwordsMismatch: "As senhas não coincidem",
  },
  button: "Entrar",
};

export const signUpFormSchema = createAccountSchema
  .extend({
    confirmPassword: z.string().min(1, texts.errors.confirmPasswordRequired),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: texts.errors.passwordsMismatch,
    path: ["confirmPassword"],
  });

type CreateAccountFormData = z.infer<typeof signUpFormSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: "onBlur",
  });

  async function onSubmit({
    confirmPassword,
    ...values
  }: CreateAccountFormData) {
    const fetchResponse = await fetch("/api/create-account", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response: CreateAccountApiResponse = await fetchResponse.json();

    if (!response.success) {
      const errors = response.errors;
      for (const field in errors.properties) {
        const [error] = errors.properties[field].errors;
        setError(field as any, { type: "server", message: error });
      }
      const {
        errors: [serverErrors],
      } = errors;
      serverErrors && alert(serverErrors);
      return;
    }

    alert(response.success);
  }

  const nameField = (
    <fieldset>
      <Input
        type="text"
        placeholder={texts.placeholders.name}
        {...register("name")}
      />
      <FormError message={errors.name?.message} />
    </fieldset>
  );

  const surnameField = (
    <fieldset>
      <Input
        type="text"
        placeholder={texts.placeholders.surname}
        {...register("surname")}
      />
      <FormError message={errors.surname?.message} />
    </fieldset>
  );

  const emailField = (
    <fieldset>
      <Input
        type="email"
        placeholder={texts.placeholders.email}
        {...register("email")}
      />
      <FormError message={errors.email?.message} />
    </fieldset>
  );

  const passwordField = (
    <fieldset>
      <Input
        type="password"
        placeholder={texts.placeholders.password}
        {...register("password")}
      />
      <FormError message={errors.password?.message} />
    </fieldset>
  );

  const confirmPasswordField = (
    <fieldset>
      <Input
        type="password"
        placeholder={texts.placeholders.confirmPassword}
        {...register("confirmPassword")}
      />
      <FormError message={errors.confirmPassword?.message} />
    </fieldset>
  );

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10">
      <Title className="text-center text-2xl font-bold">{texts.title}</Title>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        {nameField}
        {surnameField}
        {emailField}
        {passwordField}
        {confirmPasswordField}
        <Button type="submit">{texts.button}</Button>
      </form>
    </div>
  );
}
