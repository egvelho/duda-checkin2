"use client";

import { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Title } from "@/components/title";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
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
