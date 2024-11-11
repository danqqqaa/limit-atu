import { router, limitProcedure } from "../../trpc/trpc";
import { limitService } from "./service";

export const limitRouter = router({
  getLimits: limitProcedure.query(async (op) => {
        
    return await limitService.getLimits();
  }),
});
