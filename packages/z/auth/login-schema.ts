import { z } from "zod";

export const schema = z.object({
  username: z.string().trim().refine(
    (value) => {
      return value.length >= 3
    },
    {
      message: "Логин должен быть от 3 символов",
    }
  ),
  password: z.string().trim().refine(
    (value) => {
      return value.length >= 3
    },
    {
      message: "Пароль должен быть от 3 символов",
    }
  ),
});

export type schemaType = z.infer<typeof schema>;
