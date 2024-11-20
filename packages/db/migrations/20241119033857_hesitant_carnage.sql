CREATE TABLE IF NOT EXISTS "mvz" (
	"id" serial PRIMARY KEY NOT NULL,
	"positionNumber" integer,
	"transportationParticipant" integer,
	"name" varchar,
	"description" varchar,
	"createdAt" timestamp,
	"updatedAt" timestamp,
	"displayName" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subdivision" (
	"id" serial PRIMARY KEY NOT NULL,
	"positionNumber" integer,
	"type" varchar,
	"name" varchar,
	"description" timestamp,
	"shortName" varchar,
	"address" varchar,
	"longitude" varchar,
	"latitude" varchar,
	"allowedRequest" boolean,
	"inn" integer,
	"reasonCode" integer,
	"linkedUsers" varchar,
	"phoneNumber" varchar,
	"email" varchar,
	"directorName" varchar,
	"responsiblePerson" varchar,
	"additionalPhoneNumber" varchar,
	"createdAt" timestamp,
	"updatedAt" timestamp,
	"code" varchar,
	"canDelete" boolean,
	"customerAccountStatus" varchar,
	"customerAccountActive" boolean,
	"contractorAccountStatus" varchar,
	"contractorAccountActive" boolean,
	"contractorAccountUntil" timestamp,
	"displayName" varchar
);