"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { delay } from "@/lib/delay";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Title } from "@/components/title";
import type { LoginApiResponse } from "@/app/api/login/route";

const texts = {
  title: "Entrar na sua conta",
  placeholders: {
    email: "Email",
    password: "Password",
  },
  buttons: {
    signIn: "Sign In",
  },
};

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const fetchResponse = await fetch("/api/login", {
      body: JSON.stringify({ email, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response: LoginApiResponse = await fetchResponse.json();

    if (response.success) {
      alert("Login realizado com sucesso!");
      router.refresh();
      await delay(1000);
      router.replace("/");
    } else {
      alert("Usuário ou senha inválidos!");
    }
  }

  return (
    <div className="flex flex-col max-w-md mx-auto mt-10">
      <Title className="text-center text-2xl font-bold">{texts.title}</Title>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder={texts.placeholders.email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          placeholder={texts.placeholders.password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          className="bg-amber-600 text-white font-bold rounded-md p-2"
        >
          {texts.buttons.signIn}
        </Button>
      </form>
    </div>
  );
}
