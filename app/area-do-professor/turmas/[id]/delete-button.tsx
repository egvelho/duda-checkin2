"use client";

import { Button } from "@/components/button";
import { deletePost } from "./actions";

type DeleteButtonProps = {
  id: number;
};

export function DeleteButton({ id }: DeleteButtonProps) {
  async function onDelete() {
    const deletedClass = await deletePost(id);
    alert(`A turma "${deletedClass.name}" foi deletada com sucesso!`);
  }

  return <Button onClick={onDelete}>Deletar</Button>;
}
