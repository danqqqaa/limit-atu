import { router, publicProcedure } from "../../trpc/trpc";
import { cronService } from "./service";
import { CronJob } from 'cron';

new CronJob(
  '*/30 * * * * *', // cronTime
  async function () {
    await cronService.updateMvz();
    await cronService.updateSubdivisions();
    console.log('Обновление таблиц кроном!');
  }, // onTick
  null, // onComplete
  true, // start
);
export const cronRouter = router({
  getMvz: publicProcedure.query(async (op) => {
    return await cronService.getMvz();
  }),
  getSubdivisions: publicProcedure.query(async (op) => {
    return await cronService.getSubdivisions();
  }),
  updateMvz: publicProcedure.query(async (op) => {
    return await cronService.updateMvz();
  }),
});


 