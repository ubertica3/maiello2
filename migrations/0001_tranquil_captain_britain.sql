CREATE TABLE "ebooks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"cover_image" text NOT NULL,
	"price" text NOT NULL,
	"sale_price" text,
	"buy_link" text NOT NULL,
	"features" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hero_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"background_image" text NOT NULL,
	"button_text_1" text,
	"button_link_1" text,
	"button_text_2" text,
	"button_link_2" text,
	"image_position" text DEFAULT 'center center',
	"image_scale" real DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"embed_url" text NOT NULL,
	"thumbnail_image" text,
	"image_position" text DEFAULT 'center center',
	"image_scale" real DEFAULT 1,
	"display_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
