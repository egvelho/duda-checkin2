import { prisma } from "@/lib/prisma";
import { EditForm } from "./edit-form";

type ClassEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditClassPage({ params }: ClassEditPageProps) {
  const { id } = await params;
  const turma = await prisma.class.findFirstOrThrow({
    where: {
      id: +id,
    },
  });

  return (
    <div>
      editar turma {id}
      <EditForm {...turma} />
    </div>
  );
}
