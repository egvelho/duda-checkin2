import { JWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const SESSION_ID = "SESSION_ID";

export class Auth {
  static async login(email: string, password: string) {
    const user = await prisma.teacher.findUnique({
      where: {
        email,
        password,
      },
    });

    if (user === null) {
      return null;
    }

    const payload = {
      name: user.name,
      email: user.email,
    };

    const jwt = await JWT.encode(payload);

    const requestCookies = await cookies();
    requestCookies.set(SESSION_ID, jwt);
    return user;
  }

  static async logout() {
    const sessionCookies = await cookies();
    const jwt = await sessionCookies.get(SESSION_ID);
    const payload = await JWT.decode(jwt?.value ?? "");

    sessionCookies.delete(SESSION_ID);
    const user = await prisma.teacher.findFirstOrThrow({
      where: {
        email: payload.email,
      },
    });

    return user;
  }

  static async getUser() {
    const sessionCookies = await cookies();
    const token = sessionCookies.get(SESSION_ID);

    if (token === undefined) {
      return null;
    }

    const payload = await JWT.decode(token.value);
    const user = await prisma.teacher.findUniqueOrThrow({
      where: {
        email: payload.email,
      },
    });

    return user;
  }
}
