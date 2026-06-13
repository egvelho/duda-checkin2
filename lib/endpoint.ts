import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "./prisma";
import * as jose from "jose";

export function endpoint<T = unknown>(
  fn: (request: Request, response: Response) => Promise<NextResponse<T>>,
) {
  return async (request: Request, response: Response) => {
    try {
      return fn(request, response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            errors: z.treeifyError(error),
          },
          { status: 422 },
        );
      } else if (
        error instanceof jose.errors.JWTExpired ||
        error instanceof jose.errors.JWSSignatureVerificationFailed ||
        error instanceof jose.errors.JWTInvalid
      ) {
        return NextResponse.json(
          {
            success: false,
            errors: [],
          },
          { status: 401 },
        );
      } else {
        console.error(error);
        return NextResponse.json(
          {
            success: false,
            errors: [],
          },
          { status: 500 },
        );
      }
    }
  };
}
