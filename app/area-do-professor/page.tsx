import { prisma, Prisma } from "@/lib/prisma";
import { Auth } from "@/lib/auth";
import { Card } from "@/components/card";
import Link from "next/link";

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

const mapNameToColor = (name: string) => {
  const [r = 255, g = 255, b = 255] = name
    .split(" ")
    .map((palavra) => palavra.at(0)?.toUpperCase().charCodeAt(0) ?? 0)
    .map((code) => (code * 10007) % 256);
  return `rgb(${r}, ${g}, ${b})`;
};

function ClassItem({ time, day, name }: ClassItemProps) {
  return (
    <div className="border-b-2 last:border-b-0 pb-2 border-b-gray-500 flex gap-2">
      <div
        className={`w-[36px] h-[36px] rounded-full flex items-center justify-center`}
        style={{
          backgroundColor: mapNameToColor(name),
        }}
      >
        {name
          .split(" ")
          .map((palavra) => palavra.at(0))
          .join("")
          .toUpperCase()}
      </div>
      <div>
        <span className="uppercase font-bold text-[10px]">
          {day} às {time}
        </span>
        <h2 className="text-lg leading-3">{name}</h2>
      </div>
    </div>
  );
}
