"use client";

import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  return (
    <div>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Email"
          className="border rounded-md p-2"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded-md p-2"
          value={senha}
          onChange={(event) => {
            setSenha(event.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-amber-600 text-white text-bold rounded-md p-2"
        >
          Entrar
        </button>
      </form>
      <BotaoOnOff />
    </div>
  );
}

function BotaoOnOff() {
  const [on, setOn] = useState(true);
  const label = on ? "Ligado" : "Desligado";
  const estilo = on ? "bg-red-600" : "bg-blue-600";
  return (
    <button
      onClick={() => setOn(!on)}
      className={`${estilo} text-white rounded-md p-2`}
    >
      {label}
    </button>
  );
}
