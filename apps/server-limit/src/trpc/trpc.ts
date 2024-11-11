import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;
export const authProcedure = t.procedure.use((opts) => {
  const { ctx } = opts;

  return opts.next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

export const limitProcedure = t.procedure.use((opts) => {


  return opts.next({
    ctx: {
     
    },
  });
});