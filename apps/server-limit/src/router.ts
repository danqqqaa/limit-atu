import { router } from "./trpc/trpc";
import { userRouter } from "./modules/users/router";
import { authRouter } from "./modules/auth/router";
import { limitRouter } from "./modules/limit/router";

const appRouter = router({
  user: userRouter,
  auth: authRouter,
  limit: limitRouter
});

export type AppRouter = typeof appRouter;
export default appRouter;
