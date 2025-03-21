// import { fetchDataGet } from "../../services/fetch";
// import { TRPCError } from "@trpc/server";
import { db, costCenter, subdivision, contractor, subdivisionToContractor, costCenterToSubdivisionToCounterparty, transportation, limit, and, eq, gte, lte } from "db-limit";
import { sum } from 'db-limit';

export class CronService {
  public async updateCostCenter() { // мвз
    // получение данных от внешнего апи

    // const data = await fetchDataGet(
    //   "https://itm-dev.satellite-soft.ru/api/v2/external/data/transportation_participant",
    // );
    // if (!data) throw new TRPCError({ code: "NOT_FOUND", message: 'Не найдено' });
    // return data;

    const testdata = [{ id: 1, externalId: "fe86823f-0f4a-11e1-a3b8-0018f3ecdedb", name: "4781401" }, { id: 2, externalId: "fe86823f-0f4a-11e1-a3b8-0018f3ecdedb", name: "4781401" }]
    for (const item of testdata) {
      await db.insert(costCenter)
        .values(item)
        .onConflictDoUpdate({ target: costCenter.id, set: { externalId: item.externalId, name: item.name } }) // обновление нужных полей
    }
  }
  public async updateSubdivisions() { // подразделения
    const testdata = [{ id: 1, externalId: "fe86823f-0f4a-11e1-a3b8-0018f3ecdedb", name: "НТЦ" },
    { id: 2, externalId: "fe86823f-0f4a-11e1-a3b8-0018f3ecdedb", name: "ЦЭС И П" }]
    for (const item of testdata) {
      await db.insert(subdivision)
        .values(item)
        .onConflictDoUpdate({ target: subdivision.id, set: { externalId: item.externalId, name: item.name } })
    }
  }
  public async updateContractor() { // контрагенты
    const testdata = [{ id: 1, name: "ЧЕРКАСОВ АНАТОЛИЙ АНАТОЛЬЕВИЧ" },
    { id: 2, name: "123" }]
    for (const item of testdata) {
      await db.insert(contractor)
        .values(item)
        .onConflictDoUpdate({ target: contractor.id, set: { name: item.name } })
    }
  }
  public async updateSubdivisionToContractor() { // подразделения + контрагенты
    const testdata = [{ id: 1, subdivisionId: 1, contractorId: 1 },
    { id: 2, subdivisionId: 1, contractorId: 2 }]
    for (const item of testdata) {
      await db.insert(subdivisionToContractor)
        .values(item)
        .onConflictDoUpdate({ target: subdivisionToContractor.id, set: { subdivisionId: item.subdivisionId, contractorId: item.contractorId } })
    }
  }
  public async updateCostCenterToSubdivisionToCounterparty() { // мвз и подразделения + контрагенты
    const testdata = [{ id: 1, costCenterId: 1, subdivisionToContractorId: 1 },
    { id: 2, costCenterId: 1, subdivisionToContractorId: 2 }]
    for (const item of testdata) {
      await db.insert(costCenterToSubdivisionToCounterparty)
        .values(item)
        .onConflictDoUpdate({ target: costCenterToSubdivisionToCounterparty.id, set: { costCenterId: item.costCenterId, subdivisionToContractorId: item.subdivisionToContractorId } })
    }
  }

  public async updateTransportation() { // получение заявок
    const testdata = [
      {
        id: 1109,
        executedStartedAt: new Date("2024-11-27T17:42:19"),
        executedEndedAt: new Date("2024-11-27T18:15:14"),
        userCostCenterRequestLimit: 1,
        totalMileage: 0.1103873,
        zeroMileage: 0,
        loadedMileage: 0,
        unloadedMileage: 0,
        loadingUnloadingTime: 0,
        travelTime: 32
      },
      {
        id: 1110,
        executedStartedAt: new Date("2024-11-27T17:42:19"),
        executedEndedAt: new Date("2024-11-27T18:15:14"),
        userCostCenterRequestLimit: 1,
        totalMileage: 22,
        zeroMileage: 0,
        loadedMileage: 0,
        unloadedMileage: 0,
        loadingUnloadingTime: 0,
        travelTime: 42
      },
      {
        id: 1111,
        executedStartedAt: new Date("2024-11-27T17:42:19"),
        executedEndedAt: new Date(),
        userCostCenterRequestLimit: 1,
        totalMileage: 22,
        zeroMileage: 0,
        loadedMileage: 0,
        unloadedMileage: 0,
        loadingUnloadingTime: 0,
        travelTime: 42
      }
    ]
    for (const item of testdata) {
      await db.insert(transportation)
        .values(item)
        .onConflictDoUpdate({
          target: transportation.id, set: {
            executedStartedAt: item.executedStartedAt,
            executedEndedAt: item.executedEndedAt,
            userCostCenterRequestLimitId: item.userCostCenterRequestLimit,
            totalMileage: item.totalMileage,
            zeroMileage: item.zeroMileage,
            loadedMileage: item.loadedMileage,
            unloadedMileage: item.unloadedMileage,
            loadingUnloadingTime: item.loadingUnloadingTime,
            travelTime: item.travelTime
          }
        })
    }
  }

  public async createMonthLimits() { // создание месячных лимитов для всех userCostCenterRequestLimitId
    const arrIds = await db.select().from(costCenterToSubdivisionToCounterparty)
    const today = new Date();
    const month = today.getMonth(); // январь = 0
    const year = today.getFullYear();
    for (const item of arrIds) {
      const limitExist = await db.select().from(limit).where(
        and(
          eq(limit.userCostCenterRequestLimitId, item.id),
          eq(limit.month, month),
          eq(limit.year, year),
        )
      )
      if (limitExist.length == 0) // если нет лимита, то создать
        await db.insert(limit)
          .values({ year: year, month: month, userCostCenterRequestLimitId: item.id }).onConflictDoNothing()
    }
  }

  public async updateLimits() { // обновление лимитов в текущем месяце
    const arrIds = await db.select().from(costCenterToSubdivisionToCounterparty)
    const today = new Date();
    const month = today.getMonth(); // январь = 0
    const year = today.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    for (const item of arrIds) {
      // сумма лимитов за текущий месяц [ { sumTotalMileage: '22', sumTravelTime: '42' } ]
      const result = await db.select({ sumTotalMileage: sum(transportation.totalMileage), sumTravelTime: sum(transportation.travelTime) })
        .from(transportation).where(
          and(
            eq(transportation.userCostCenterRequestLimitId, item.id),
            gte(transportation.executedEndedAt, firstDay),
            lte(transportation.executedEndedAt, lastDay)
          )
        );
      // обновить пробег в км
      if (result[0].sumTotalMileage) {
        await db.update(limit)
          .set({ usedMileage: Number(result[0].sumTotalMileage) })
          .where(and(
            eq(limit.userCostCenterRequestLimitId, item.id),
            eq(limit.month, month),
            eq(limit.year, year),
          ));
      }
      // обновить пробег в минутах
      if (result[0].sumTravelTime) {
        await db.update(limit)
          .set({ usedTime: Number(result[0].sumTravelTime) })
          .where(and(
            eq(limit.userCostCenterRequestLimitId, item.id),
            eq(limit.month, month),
            eq(limit.year, year),
          ));
      }
    }
  }
}

export const cronService = new CronService();
