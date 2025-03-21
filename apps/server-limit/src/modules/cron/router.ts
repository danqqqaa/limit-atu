import { router } from "../../trpc/trpc";
import { cronService } from "./service";
import { CronJob } from 'cron';

new CronJob(
  '*/30 * * * * *', // cronTime
  async function () {
    await cronService.updateCostCenter(); // получение справочника мвз
    await cronService.updateSubdivisions(); // получение справочника подразделений
    await cronService.updateContractor(); // получение справочника контрагентов
    await cronService.updateSubdivisionToContractor(); // получение справочника подразделение+контрагент
    await cronService.updateCostCenterToSubdivisionToCounterparty(); // получение справочника мвз и подразделение+контрагент
    await cronService.updateTransportation(); // получение заявок за месяц
    await cronService.updateLimits(); // обновление лимитов

    await cronService.createMonthLimits(); // создание месячных лимитов на все значения справочника мвз и подразделение+контрагент
    console.log('Обновление таблиц кроном!');
  }, // onTick
  null, // onComplete
  true, // start
);
export const cronRouter = router({
  // getMvz: publicProcedure.query(async (op) => {
  //   return await cronService.getMvz();
  // }),
  // getSubdivisions: publicProcedure.query(async (op) => {
  //   return await cronService.getSubdivisions();
  // }),
  // updateMvz: publicProcedure.query(async (op) => {
  //   return await cronService.updateCostCenter();
  // }),
});


 