"use client";

import type { Prisma } from "@/lib/prisma";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { FormError } from "@/components/form-error";
import { editClass } from "./actions";
import { id } from "zod/locales";

type EditFormProps = Prisma.ClassModel;

const classSchema = z.object({
  name: z.string().min(4).max(22),
  day: z.string(),
  time: z.string(),
});

const dias = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

export function EditForm(turma: EditFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(classSchema),
    values: turma,
    mode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof classSchema>) {
    const editedClass = await editClass(turma.id, values);
    alert(`A turma "${editedClass.name}" foi atualizada com sucesso!`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 p-2">
      <Input type="text" {...register("name")} />
      <FormError message={errors.name?.message} />
      <select
        id=""
        className={`
          w-full px-4 py-2.5 
          bg-white border rounded-xl
          border-gray-300
          text-secondary-900 placeholder:text-secondary-500
          transition-all duration-200 outline-none
          border-secondary-200 hover:border-secondary-300
          focus:border-primary focus:ring-4 focus:ring-primary/10
          disabled:bg-secondary-50 disabled:cursor-not-allowed          
        `}
        {...register("day")}
      >
        {dias.map((dia) => (
          <option key={dia} value={dia}>
            {dia}
          </option>
        ))}
      </select>
      <Input type="text" {...register("time")} />
      <FormError message={errors.time?.message} />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
