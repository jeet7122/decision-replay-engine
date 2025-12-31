CREATE TYPE "public"."OutcomeType" AS ENUM('positive', 'neutral', 'negative');--> statement-breakpoint
CREATE TABLE "ai_replays" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"decision_id" varchar(191) NOT NULL,
	"analysis" text NOT NULL,
	"generated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "decisions" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"context" text NOT NULL,
	"options" json NOT NULL,
	"chosen" varchar(255) NOT NULL,
	"confidence" integer NOT NULL,
	"reasoning" text,
	"created_at" timestamp DEFAULT now(),
	"user_id" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outcomes" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"decision_id" varchar(191) NOT NULL,
	"type" "OutcomeType" NOT NULL,
	"description" text NOT NULL,
	"time_cost" integer,
	"lesson" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "ai_replays" ADD CONSTRAINT "ai_replays_decision_id_decisions_id_fk" FOREIGN KEY ("decision_id") REFERENCES "public"."decisions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decisions" ADD CONSTRAINT "decisions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_decision_id_decisions_id_fk" FOREIGN KEY ("decision_id") REFERENCES "public"."decisions"("id") ON DELETE no action ON UPDATE no action;