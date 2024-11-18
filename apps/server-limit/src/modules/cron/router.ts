import { router, publicProcedure } from "../../trpc/trpc";
import { cronService } from "./service";
import { CronJob } from 'cron';


export const cronRouter = router({
  getMvz: publicProcedure.query(async (op) => {
    return await cronService.getMvz();
  }),
  getSubdivisions: publicProcedure.query(async (op) => {
    new CronJob(
      '30 * * * * *', // cronTime
      function () {
        console.log('You will see this message every second');
      }, // onTick
      null, // onComplete
      true, // start
    );
    return await cronService.getSubdivisions();
  }),
});


 