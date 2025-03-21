import { router, privateProcedure } from "../../trpc/trpc";
import { limitService } from "./service";

export const limitRouter = router({
  getLimits: privateProcedure.query(async (opts) => {
    return await limitService.getLimits({ year: 2025, month: 2 });
  }),
  updateLimit: privateProcedure.query(async (op) => {
    return await limitService.updateLimit(op);
  }),
});
