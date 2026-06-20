"use server";
import { prisma } from "@/lib/prisma";

export async function deletePost(id: number) {
  const deletedClass = await prisma.class.delete({
    where: {
      id,
    },
  });

  return deletedClass;
}
