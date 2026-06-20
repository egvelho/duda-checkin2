import { prisma, Prisma } from "@/lib/prisma";
import { Auth } from "@/lib/auth";
import { Card } from "@/components/card";
import Link from "next/link";
import { TurmaImage } from "@/components/turma-image";

export default async function TeacherArea() {
  const user = await Auth.getUser();
  const classes = await prisma.class.findMany({
    where: {
      teacherId: user?.id,
    },
  });

  const classesDiv = classes.map((class_) => (
    <Link
      href={`/area-do-professor/turmas/${class_.id}`}
      key={class_.id}
      className="cursor-pointer"
    >
      <ClassItem {...class_} />
    </Link>
  ));

  return (
    <div>
      Oi {user?.name}
      <Card className="p-4 m-4">{classesDiv}</Card>
    </div>
  );
}

type ClassItemProps = Prisma.ClassModel;

function ClassItem({ time, day, name }: ClassItemProps) {
  return (
    <div className="border-b-2 last:border-b-0 pb-2 border-b-gray-500 flex gap-2">
      <TurmaImage name={name} />
      <div>
        <span className="uppercase font-bold text-[10px]">
          {day} às {time}
        </span>
        <h2 className="text-lg leading-3">{name}</h2>
      </div>
    </div>
  );
}
