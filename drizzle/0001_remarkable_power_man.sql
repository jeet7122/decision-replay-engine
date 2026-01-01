ALTER TABLE "ai_replays" RENAME COLUMN "analysis" TO "title";--> statement-breakpoint
ALTER TABLE "ai_replays" DROP CONSTRAINT "ai_replays_decision_id_decisions_id_fk";
--> statement-breakpoint
ALTER TABLE "ai_replays" ALTER COLUMN "generated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_replays" ADD COLUMN "root_cause" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_replays" ADD COLUMN "hidden_tradeoffs" json NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_replays" ADD COLUMN "best_alternative" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_replays" ADD COLUMN "lesson" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ai_replays" ADD CONSTRAINT "ai_replays_decision_id_decisions_id_fk" FOREIGN KEY ("decision_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;