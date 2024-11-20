DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('password');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "limit" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer,
	"month" integer,
	"used" integer,
	"limit" integer,
	"subdivision_id" integer,
	"mvz_id" integer,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"login" varchar(255),
	"name" varchar(255),
	"surname" varchar(255),
	"middlename" varchar(255),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_login_unique" UNIQUE("login")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userCredentials" (
	"user_id" integer PRIMARY KEY NOT NULL,
	"type" "type" DEFAULT 'password',
	"payload" varchar(255) NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "limit" ADD CONSTRAINT "limit_subdivision_id_subdivision_id_fk" FOREIGN KEY ("subdivision_id") REFERENCES "public"."subdivision"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "limit" ADD CONSTRAINT "limit_mvz_id_mvz_id_fk" FOREIGN KEY ("mvz_id") REFERENCES "public"."mvz"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userCredentials" ADD CONSTRAINT "userCredentials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
