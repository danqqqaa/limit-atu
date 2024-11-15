import { router, publicProcedure } from "../../trpc/trpc";
import { authService } from "./service";
import { loginSchema } from "z-limit";

export const authRouter = router({
  login: publicProcedure.input(loginSchema).mutation(async (opts) => {
    return await authService.login(opts.input);
  }),
});
 