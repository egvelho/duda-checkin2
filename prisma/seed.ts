import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";

async function seed() {
  await prisma.class.deleteMany();
  await prisma.teacher.deleteMany();

  const nTeachers = 100;
  const batchSize = 100;
  const diasDaSemana = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const horarios = ["08:00", "10:00", "14:00", "16:00", "19:00", "21:00"];

  console.log(`Iniciando o seed de ${nTeachers} professores com turmas...`);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("monark", salt);

  for (let i = 0; i < nTeachers; i += batchSize) {
    const loteAtual = Math.min(batchSize, nTeachers - i);
    const operacoesDoLote = [];

    for (let j = 0; j < loteAtual; j++) {
      const quantidadeDeTurmas = faker.number.int({ min: 3, max: 10 });
      const turmasDoProfessor = Array.from({ length: quantidadeDeTurmas }).map(
        () => ({
          name: `${faker.word.adjective()} ${faker.science.chemicalElement().name}`,
          day: faker.helpers.arrayElement(diasDaSemana),
          time: faker.helpers.arrayElement(horarios),
        }),
      );

      operacoesDoLote.push(
        prisma.teacher.create({
          data: {
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email().toLowerCase(),
            password: passwordHash,
            classes: {
              create: turmasDoProfessor,
            },
          },
        }),
      );
    }

    await prisma.$transaction(operacoesDoLote);
    console.log(
      `Progresso: ${i + loteAtual}/${nTeachers} professores criados.`,
    );
  }

  const totalClasses = await prisma.class.count();
  console.log(`Seed efetuado com sucesso!`);
  console.log(`Total de Professores: ${nTeachers}`);
  console.log(`Total de Turmas: ${totalClasses}`);
}

seed()
  .catch((e) => {
    console.error("Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
