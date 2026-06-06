type ApiResponse<Data = unknown, Error = unknown> =
  | {
      success: true;
      data: Data;
      errors?: undefined;
    }
  | { success: false; errors: Error; data?: undefined };

type InferZodError<Schema> = z.inferFormattedError<Schema>;
