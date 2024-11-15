import { privateProcedure, router } from "../../trpc/trpc";
import { userService } from "./service";

export const userRouter = router({
  getOrganizations: privateProcedure.query(async (op) => {
    const { ctx } = op;
    return await userService.getOrganizations(ctx);
  }),
});
