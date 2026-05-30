import { SignJWT, jwtVerify } from "jose";

export class JWT {
  static #secret = new TextEncoder().encode("monarkjacomeco");

  static async encode(payload: any, expiration = "2h") {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiration)
      .sign(this.#secret);

    return token;
  }

  static async decode(token: string) {
    try {
      const { payload } = await jwtVerify(token, this.#secret);
      return payload;
    } catch {
      return undefined;
    }
  }
}
