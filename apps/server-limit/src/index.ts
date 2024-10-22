
import appRouter from "./router";
import  createContext from '../src/trpc/context'
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { appConfig } from "./config";


async function startServer() {
  try {
    const httpServer = createHTTPServer({
      router: appRouter,
      middleware: cors(),
      createContext: () => createContext,
    });

    httpServer.listen(appConfig.port)


    console.log(`🚀 обманываем ракетку на порту ${appConfig.port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();


