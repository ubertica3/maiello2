import { pgTable, text, serial, integer, boolean, timestamp, date, varchar, json, pgEnum, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  role: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Newsletter subscribers table
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  name: true,
  email: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// Contact form submissions table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Event type enum
export const eventTypeEnum = pgEnum('event_type', ['event', 'workshop']);

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  venue: text("venue").notNull(),
  location: text("location").notNull(),
  date: text("date").notNull(),
  month: text("month").notNull(),
  time: text("time").notNull(),
  image: text("image").notNull(),
  ticketUrl: text("ticket_url").notNull(),
  eventType: eventTypeEnum("event_type").default("event").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  venue: true,
  location: true,
  date: true,
  month: true,
  time: true,
  image: true,
  ticketUrl: true,
  eventType: true
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  featuredImage: text("featured_image").notNull(),
  authorId: integer("author_id").references(() => users.id),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  content: true,
  excerpt: true, 
  featuredImage: true,
  authorId: true,
  published: true
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Site settings table
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  section: text("section").notNull(),
  settings: json("settings").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).pick({
  section: true,
  settings: true
});

export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;

// Ebook table
export const ebooks = pgTable("ebooks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image").notNull(),
  price: text("price").notNull(),
  salePrice: text("sale_price"),
  buyLink: text("buy_link").notNull(),
  features: json("features").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertEbookSchema = createInsertSchema(ebooks).pick({
  title: true,
  description: true,
  coverImage: true,
  price: true,
  salePrice: true,
  buyLink: true,
  features: true
});

export type InsertEbook = z.infer<typeof insertEbookSchema>;
export type Ebook = typeof ebooks.$inferSelect;

// Relations
export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id]
  })
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(blogPosts)
}));

// Hero section table
export const heroSettings = pgTable("hero_settings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  backgroundImage: text("background_image").notNull(),
  buttonText1: text("button_text_1"),
  buttonLink1: text("button_link_1"),
  buttonText2: text("button_text_2"),
  buttonLink2: text("button_link_2"),
  imagePosition: text("image_position").default("center center"),
  imageScale: real("image_scale").default(1.0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertHeroSettingsSchema = createInsertSchema(heroSettings).pick({
  title: true,
  subtitle: true,
  backgroundImage: true,
  buttonText1: true,
  buttonLink1: true,
  buttonText2: true,
  buttonLink2: true,
  imagePosition: true,
  imageScale: true
});

export type InsertHeroSettings = z.infer<typeof insertHeroSettingsSchema>;
export type HeroSettings = typeof heroSettings.$inferSelect;

// Interviews table
export const interviews = pgTable("interviews", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  embedUrl: text("embed_url").notNull(),
  thumbnailImage: text("thumbnail_image"),
  imagePosition: text("image_position").default("center center"),
  imageScale: real("image_scale").default(1.0),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const insertInterviewSchema = createInsertSchema(interviews).pick({
  title: true,
  description: true,
  embedUrl: true,
  thumbnailImage: true,
  imagePosition: true,
  imageScale: true,
  displayOrder: true
});

export type InsertInterview = z.infer<typeof insertInterviewSchema>;
export type Interview = typeof interviews.$inferSelect;
