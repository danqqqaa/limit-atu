import { relations } from "drizzle-orm";
import { doublePrecision, integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  login: varchar("login", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  surname: varchar("surname", { length: 255 }),
  middlename: varchar("middlename", { length: 255 }),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type UserType = typeof user.$inferSelect

export const typeCredentials = pgEnum('type', ['password'])

export const userCredentials = pgTable('userCredentials', {
  user_id: integer('user_id').notNull().references(() => user.id).primaryKey(),
  type: typeCredentials().default('password'),
  payload: varchar("payload", { length: 255 }).notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const limit = pgTable("limit", { // лимит, создаваемый каждый месяц на каждый costCenterToPairId
  id: serial("id").primaryKey(),
  year: integer("year"),
  month: integer("month"),
  usedMileage: doublePrecision("usedMileage").default(0), //в км
  limitMileage: doublePrecision("limitMileage").default(0),
  usedTime: doublePrecision("usedTime").default(0), //в мин
  limitTime: doublePrecision("limitTime").default(0),
  userCostCenterRequestLimitId: integer("userCostCenterRequestLimit_id").references(() => costCenterToSubdivisionToCounterparty.id),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const transportation = pgTable("transportation", { // получаемые заявки 2.
  id: integer("id").primaryKey(),
  executedStartedAt: timestamp("executedStartedAt"),
  executedEndedAt: timestamp("executedEndedAt"),
  userCostCenterRequestLimitId: integer("userCostCenterRequestLimit_id").references(() => costCenterToSubdivisionToCounterparty.id),
  totalMileage: doublePrecision("totalMileage"),
  zeroMileage: doublePrecision("zeroMileage"),
  loadedMileage: doublePrecision("loadedMileage"),
  unloadedMileage: doublePrecision("unloadedMileage"),
  loadingUnloadingTime: doublePrecision("loadingUnloadingTime"),
  travelTime: doublePrecision("travelTime"),
});

export const subdivision = pgTable("subdivision", { // подразделение 1.2 
  id: integer("id").primaryKey(),
  externalId: varchar("externalId"),
  name: varchar("name"),
});

export const subdivisionRelations = relations(subdivision, ({ many }) => ({
  subdivisionToContractor: many(subdivisionToContractor),
}));


export const contractor = pgTable("contractor", { // контрагенты 1.1
  id: integer("id").primaryKey(),
  name: varchar("name"),
});

export const contractorRelations = relations(contractor, ({ many }) => ({
  subdivisionToContractor: many(subdivisionToContractor),
}));

export const subdivisionToContractor = pgTable( // пары контрагент+подразделение 1.3
  'subdivision_to_contractor',
  {
    id: integer("id").primaryKey(),
    subdivisionId: integer('subdivision_id')
      .notNull()
      .references(() => subdivision.id),
    contractorId: integer('contractor_id')
      .notNull()
      .references(() => contractor.id),
  },
  // (t) => [
  // 	primaryKey({ columns: [t.subdivisionId, t.counterpartyId] })
  // ],
);

export const subdivisionToCounterpartyRelations = relations(subdivisionToContractor, ({ one }) => ({
  subdivision: one(subdivision, {
    fields: [subdivisionToContractor.subdivisionId],
    references: [subdivision.id],
  }),
  counterparty: one(contractor, {
    fields: [subdivisionToContractor.contractorId],
    references: [contractor.id],
  }),
}));

export const costCenter = pgTable("costCenter", { //мвз 1.4
  id: integer("id").primaryKey(),
  externalId: varchar("externalId"),
  name: varchar("name"),
});

export const costCenterRelations = relations(costCenter, ({ many }) => ({
  costCenterToSubdivisionToCounterparty: many(costCenterToSubdivisionToCounterparty),
}));

export const costCenterToSubdivisionToCounterparty = pgTable( // пары контрагент+подразделение и мвз 1.5
  'costCenter_to_subdivisionToCounterparty',
  {
    id: integer("id").primaryKey(),
    costCenterId: integer('costCenter_id')
      .notNull()
      .references(() => costCenter.id),
    subdivisionToContractorId: integer('subdivisionToContractor_id')
      .notNull()
      .references(() => subdivisionToContractor.id),
  },
  // (t) => [
  // 	primaryKey({ columns: [t.subdivisionId, t.counterpartyId] })
  // ],
);

export const costCenterToSubdivisionToCounterpartyRelations = relations(costCenterToSubdivisionToCounterparty, ({ one }) => ({
  costCenter: one(costCenter, {
    fields: [costCenterToSubdivisionToCounterparty.costCenterId],
    references: [costCenter.id],
  }),
  subdivisionToContractor: one(subdivisionToContractor, {
    fields: [costCenterToSubdivisionToCounterparty.subdivisionToContractorId],
    references: [subdivisionToContractor.id],
  }),
}));
