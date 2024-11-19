import { integer, pgEnum, pgTable, serial, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

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

export const limit = pgTable("limit", {
  id: serial("id").primaryKey(),
  year: integer("year"),
  month: integer("month"),
  used: integer("used"),
  limit: integer("limit"),
  idTableLimits: integer("idTableLimits"),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const subdivision = pgTable("subdivision", {
  id: serial("id").primaryKey(),
  positionNumber: integer("positionNumber"),
  type: varchar("type"),
  status: integer("name"),
  name: varchar("name"),
  description: timestamp("description"),
  shortName: varchar("shortName"),
  address: varchar("address"),
  longitude: varchar("longitude"),
  latitude: varchar("latitude"),
  allowedRequest: boolean("allowedRequest"),
  inn: integer("inn"),
  reasonCode: integer("reasonCode"),
  linkedUsers: varchar("linkedUsers"),
  phoneNumber: varchar("phoneNumber"),
  email: varchar("email"),
  directorName: varchar("directorName"),
  responsiblePerson: varchar("responsiblePerson"),
  additionalPhoneNumber: varchar("additionalPhoneNumber"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
  code: varchar("code"),
  canDelete: boolean("canDelete"),
  customerAccountStatus: varchar("customerAccountStatus"),
  customerAccountActive: boolean("customerAccountActive"),
  contractorAccountStatus: varchar("contractorAccountStatus"),
  contractorAccountActive: boolean("contractorAccountActive"),
  contractorAccountUntil: timestamp("contractorAccountUntil"),
  displayName: varchar("displayName"),
});
// |id|?int||
// |positionNumber|?int|Порядковый номер строки для отображения в комбобоксе|
// |type|array||
// |status|int|Статусы участников перевозок|
// |name|?string|Наименование|
// |description|?string|Описание|
// |shortName|?string|Краткое наименование|
// |address|?string|Адрес|
// |longitude|?string|Долгота|
// |latitude|?string|Широта|
// |allowedRequest|bool|Доступно ли участнику создавать запросы на перевозку|
// |inn|?int||
// |reasonCode|?int||
// |linkedUsers|array<int>||
// |phoneNumber|?string||
// |email|?string||
// |directorName|?string||
// |responsiblePerson|?string||
// |additionalPhoneNumber|?string||
// |createdAt|Не описано|Дата создания записи      * |
// |updatedAt|Не описано|Дата обновления|
// |code|string||
// |canDelete|bool||
// |customerAccountStatus|string||
// |customerAccountActive|bool||
// |contractorAccountStatus|string||
// |contractorAccountActive|bool||
// |contractorAccountUntil|DateTime||
// |displayName|string|Вариант представления в строчном виде      * |

export const mvz = pgTable("mvz", {
  id: serial("id").primaryKey(),
  positionNumber: integer("positionNumber"),
  transportationParticipant: integer("transportationParticipant"),
  name: varchar("name"),
  description: varchar("description"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
  displayName: varchar("displayName")
});
// |id|?int||
// |positionNumber|?int|Порядковый номер строки для отображения в комбобоксе|
// |transportationParticipant|int|Участники перевозок|
// |name|string|Наименование МВЗ|
// |description|?string|Описание МВЗ|
// |createdAt|Не описано|Дата создания записи      * |
// |updatedAt|Не описано|Дата обновления|
// |displayName|string|Вариант представления в строчном виде      * |