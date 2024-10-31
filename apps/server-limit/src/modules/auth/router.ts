import { router, procedure } from "../../trpc/trpc";
import { authService } from "./service";
import { registerSchema, loginSchema } from "z-limit";

export const authRouter = router({
  register: procedure.input(registerSchema).mutation(async (opts) => {
    return await authService.register(opts.input);
  }),

  login: procedure.input(loginSchema).mutation(async (opts) => {
    return await authService.login(opts.input);
  }),
});
