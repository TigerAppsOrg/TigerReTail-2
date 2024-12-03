CREATE TABLE IF NOT EXISTS "item_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"category" "category" NOT NULL,
	"legacy_id" integer,
	CONSTRAINT "item_categories_legacy_id_unique" UNIQUE("legacy_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "request_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"request_id" integer NOT NULL,
	"category" "category" NOT NULL,
	"legacy_id" integer,
	CONSTRAINT "request_categories_legacy_id_unique" UNIQUE("legacy_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_categories" ADD CONSTRAINT "item_categories_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "request_categories" ADD CONSTRAINT "request_categories_request_id_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."requests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "requests" DROP COLUMN IF EXISTS "category";