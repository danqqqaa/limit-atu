import { router, privateProcedure } from "../../trpc/trpc";
import { limitService } from "./service";

export const limitRouter = router({
  getLimits: privateProcedure.query(async (opts) => {
    return await limitService.getLimits(opts);
  }),
  getLimitsCurrentMonth: privateProcedure.query(async () => {
    return await limitService.getLimitsCurrentMonth();
  }),
  updateLimit: privateProcedure.query(async (op) => {
    return await limitService.updateLimit(op);
  }),
});
