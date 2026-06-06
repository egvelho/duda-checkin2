type InferNextResponse<T extends (...args: any[]) => any> =
  Awaited<ReturnType<T>> extends import("next/server").NextResponse<infer U>
    ? U
    : never;
