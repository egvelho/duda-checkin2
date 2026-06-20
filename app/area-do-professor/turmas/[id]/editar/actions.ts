"use server";

import { prisma, Prisma } from "@/lib/prisma";

export async function editClass(
  id: number,
  classData: Partial<Prisma.ClassModel>,
) {
  const editedClass = await prisma.class.update({
    where: {
      id,
    },
    data: classData,
  });

  return editedClass;
}
