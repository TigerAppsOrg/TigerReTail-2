DO $$ BEGIN
 CREATE TYPE "public"."affiliation" AS ENUM('ias', 'princeton');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."category" AS ENUM('accessories', 'beauty supplies', 'clothing', 'dorm essentials', 'event tickets', 'food', 'furniture', 'housing', 'other', 'school supplies', 'services', 'tech', 'textbooks', 'transportation');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."item_type" AS ENUM('sell', 'rent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."quality" AS ENUM('new', 'like new', 'good', 'fair', 'poor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'sold', 'expired');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "item_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"time_posted" timestamp NOT NULL,
	"time_expire" timestamp NOT NULL,
	"name" text NOT NULL,
	"price" numeric NOT NULL,
	"quality" "quality",
	"description" text,
	"status" "status" NOT NULL,
	"item_type" "item_type" NOT NULL,
	"category" "category" NOT NULL,
	"legacy_id" integer,
	CONSTRAINT "items_legacy_id_unique" UNIQUE("legacy_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pwd_auth" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" text NOT NULL,
	"user_id" integer NOT NULL,
	"verified" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "request_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"request_id" integer NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"time_posted" timestamp NOT NULL,
	"time_expire" timestamp NOT NULL,
	"name" text NOT NULL,
	"price" numeric NOT NULL,
	"description" text,
	"category" "category" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"affiliation" "affiliation" NOT NULL,
	"netid" text,
	"text" text,
	"phone" text,
	"legacy_id" integer,
	CONSTRAINT "user_legacy_id_unique" UNIQUE("legacy_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_images" ADD CONSTRAINT "item_images_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items" ADD CONSTRAINT "items_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pwd_auth" ADD CONSTRAINT "pwd_auth_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "request_images" ADD CONSTRAINT "request_images_request_id_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."requests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "requests" ADD CONSTRAINT "requests_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
