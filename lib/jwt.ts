import { JWTPayload, SignJWT, jwtVerify } from "jose";

type Payload = {
  email: string;
  name: string;
};

export class JWT {
  static #secret = new TextEncoder().encode(process.env.JWT_SECRET);

  static async encode(payload: Payload, expiration = "2h") {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiration)
      .sign(this.#secret);

    return token;
  }

  static async decode(token: string) {
    const { payload } = await jwtVerify(token, this.#secret);
    return payload as JWTPayload & Payload;
  }
}
