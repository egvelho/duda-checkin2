import { JWT } from "@/lib/jwt";
import { Prisma, prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const SESSION_ID = "SESSION_ID";

export class Auth {
  static async login(email: string, password: string) {
    const user = await prisma.teacher.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return null;
    }

    await this.setAuthCookie(user);

    return user;
  }

  static async logout() {
    const sessionCookies = await cookies();
    sessionCookies.delete(SESSION_ID);
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

  static async setAuthCookie(user: Prisma.TeacherModel) {
    const payload = {
      name: user.name,
      email: user.email,
    };

    const jwt = await JWT.encode(payload);

    const requestCookies = await cookies();
    requestCookies.set(SESSION_ID, jwt);
  }
}
