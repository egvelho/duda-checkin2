import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/card";
import { TurmaImage } from "@/components/turma-image";
import { DeleteButton } from "./delete-button";
import { Button } from "@/components/button";

type ClassViewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClassViewPage({ params }: ClassViewPageProps) {
  const { id } = await params;
  const turma = await prisma.class.findFirstOrThrow({
    where: {
      id: +id,
    },
  });

  return (
    <Card className="m-8 p-4">
      <TurmaImage name={turma.name} />
      <div>
        <span className="uppercase font-bold text-[10px]">
          {turma.day} às {turma.time}
        </span>
        <h2 className="text-lg leading-3">{turma.name}</h2>
      </div>
      <DeleteButton id={turma.id} />
      <Link href={`/area-do-professor/turmas/${id}/editar`}>
        <Button>Editar</Button>
      </Link>
    </Card>
  );
}
