import { prisma } from "../lib/prisma";
import { faker } from "@faker-js/faker";

async function seed() {
  const generateFakeTeacher = () => ({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  const nTeachers = 1000;
  const fakeTeachers = new Array(nTeachers).fill(null).map(generateFakeTeacher);

  await prisma.teacher.createMany({
    data: fakeTeachers,
  });

  console.log("Seed do banco de dados efetuado com sucesso!");
}

seed();
