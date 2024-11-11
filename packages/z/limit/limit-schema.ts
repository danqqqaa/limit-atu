import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  year: z.number(),
  month: z.number(),
  used: z.number(),
  limit: z.number(),
  idTableLimits: z.number(),
});

export type schemaType = z.infer<typeof schema>;
