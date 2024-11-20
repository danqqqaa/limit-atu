import { router, privateProcedure } from "../../trpc/trpc";
import { limitService } from "./service";

export const limitRouter = router({
  getLimits: privateProcedure.query(async (op) => {
    return await limitService.getLimits();
  }),
  updateLimit: privateProcedure.query(async (op) => {
    return await limitService.updateLimit(op);
  }),
});
