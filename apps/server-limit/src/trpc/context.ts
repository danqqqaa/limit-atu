// import { authService } from "../modules/auth/service";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

const createContext = async ({ req }: CreateHTTPContextOptions) => {
  if (!req.headers.authorization || !req.headers.user) {
    return { token: undefined, user: undefined };
  }
  
  const token = req.headers.authorization.split(" ")[1];
  const user = req.headers.user

  try {
    return {
      token, user
    };
  } catch {
    return {
      token: undefined, user: undefined
    };
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;

export default createContext;
