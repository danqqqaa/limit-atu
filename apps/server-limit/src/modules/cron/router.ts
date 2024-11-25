import { router, publicProcedure, privateProcedure } from "../../trpc/trpc";
import { cronService } from "./service";
import { CronJob } from 'cron';

new CronJob(
  '*/30 * * * * *', // cronTime
  async function () {
    // await cronService.updateMvz();
    // await cronService.updateSubdivisions();
    // await cronService.updateLimits();
    console.log('Обновление таблиц кроном!');
  }, // onTick
  null, // onComplete
  true, // start
);
export const cronRouter = router({
  getMvz: privateProcedure.mutation(async (op) => {
    return await cronService.getMvz(op.ctx);
  }),
  getSubdivisions: privateProcedure.mutation(async (op) => {
    return await cronService.getSubdivisions(op.ctx);
  }),
  updateMvz: publicProcedure.query(async (op) => {
    return await cronService.updateMvz();
  }),
});


 