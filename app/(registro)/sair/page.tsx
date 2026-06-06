"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { delay } from "@/lib/delay";

const texts = {
  logoutText: "Encerrando sessão...",
};

export default function LogoutPage() {
  const router = useRouter();

  async function logout() {
    const response = await fetch("/api/logout", { method: "POST" });
    router.refresh();
    await delay(1000);
    router.replace("/");
  }

  useEffect(() => {
    logout();
  }, []);

  return <span>{texts.logoutText}</span>;
}
