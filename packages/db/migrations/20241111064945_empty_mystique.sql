CREATE TABLE IF NOT EXISTS "limit" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer,
	"month" integer,
	"used" integer,
	"limit" integer,
	"idTableLimits" integer,
	"updated_at" timestamp DEFAULT now()
);
