ALTER TABLE "requests" ADD COLUMN "legacy_id" integer;--> statement-breakpoint
ALTER TABLE "item_images" ADD CONSTRAINT "item_images_url_unique" UNIQUE("url");--> statement-breakpoint
ALTER TABLE "requests" ADD CONSTRAINT "requests_legacy_id_unique" UNIQUE("legacy_id");