import { 
  users, type User, type InsertUser,
  subscribers, type Subscriber, type InsertSubscriber,
  contacts, type Contact, type InsertContact,
  events, type Event, type InsertEvent,
  blogPosts, type BlogPost, type InsertBlogPost,
  siteSettings, type SiteSettings, type InsertSiteSettings,
  ebooks, type Ebook, type InsertEbook
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

// Import Store interface from connect-pg-simple
const PostgresSessionStore = connectPg(session);
type SessionStore = ReturnType<typeof connectPg> extends new (options?: any) => infer R ? R : never;

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined>;
  
  // Subscriber methods
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  deleteSubscriber(id: number): Promise<boolean>;
  
  // Contact methods
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  deleteContact(id: number): Promise<boolean>;
  
  // Event methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, eventData: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Blog post methods
  getBlogPosts(limit?: number, includeUnpublished?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, postData: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Site settings methods
  getSiteSettings(section: string): Promise<SiteSettings | undefined>;
  updateSiteSettings(section: string, settings: any): Promise<SiteSettings | undefined>;
  
  // Ebook methods
  getEbook(): Promise<Ebook | undefined>;
  updateEbook(ebookData: Partial<InsertEbook>): Promise<Ebook | undefined>;
  
  // Session store for auth
  sessionStore: SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: SessionStore;
  
  constructor() {
    // Get the pool from db.$client
    this.sessionStore = new PostgresSessionStore({ 
      pool: db.$client,
      createTableIfMissing: true 
    });
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users)
      .set({ ...userData })
      .where(eq(users.id, id))
      .returning();
    return result[0];
  }
  
  // Subscriber methods
  async getSubscribers(): Promise<Subscriber[]> {
    return await db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const result = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return result[0];
  }
  
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const result = await db.insert(subscribers).values(insertSubscriber).returning();
    return result[0];
  }
  
  async deleteSubscriber(id: number): Promise<boolean> {
    const result = await db.delete(subscribers).where(eq(subscribers.id, id)).returning();
    return result.length > 0;
  }
  
  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id));
    return result[0];
  }
  
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(insertContact).returning();
    return result[0];
  }
  
  async deleteContact(id: number): Promise<boolean> {
    const result = await db.delete(contacts).where(eq(contacts.id, id)).returning();
    return result.length > 0;
  }
  
  // Event methods
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(asc(events.date));
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id));
    return result[0];
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(insertEvent).returning();
    return result[0];
  }
  
  async updateEvent(id: number, eventData: Partial<InsertEvent>): Promise<Event | undefined> {
    const result = await db.update(events)
      .set({ ...eventData })
      .where(eq(events.id, id))
      .returning();
    return result[0];
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }
  
  // Blog post methods
  async getBlogPosts(limit?: number, includeUnpublished = false): Promise<BlogPost[]> {
    let query = db.select().from(blogPosts);
    
    if (!includeUnpublished) {
      query = query.where(eq(blogPosts.published, true));
    }
    
    query = query.orderBy(desc(blogPosts.createdAt));
    
    if (limit) {
      query = query.limit(limit);
    }
    
    return await query;
  }
  
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result[0];
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(insertBlogPost).returning();
    return result[0];
  }
  
  async updateBlogPost(id: number, postData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await db.update(blogPosts)
      .set({ ...postData })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }
  
  // Site settings methods
  async getSiteSettings(section: string): Promise<SiteSettings | undefined> {
    const result = await db.select().from(siteSettings).where(eq(siteSettings.section, section));
    return result[0];
  }
  
  async updateSiteSettings(section: string, settings: any): Promise<SiteSettings | undefined> {
    // Check if settings exist
    const existing = await this.getSiteSettings(section);
    
    if (existing) {
      // Update existing settings
      const result = await db.update(siteSettings)
        .set({ settings })
        .where(eq(siteSettings.id, existing.id))
        .returning();
      return result[0];
    } else {
      // Create new settings
      const result = await db.insert(siteSettings)
        .values({ section, settings })
        .returning();
      return result[0];
    }
  }
  
  // Ebook methods
  async getEbook(): Promise<Ebook | undefined> {
    const result = await db.select().from(ebooks);
    // We only support one ebook at the moment, so return the first one
    return result[0];
  }
  
  async updateEbook(ebookData: Partial<InsertEbook>): Promise<Ebook | undefined> {
    // Get the existing ebook
    const existing = await this.getEbook();
    
    if (existing) {
      // Update existing ebook
      const result = await db.update(ebooks)
        .set({ 
          ...ebookData,
          updatedAt: new Date()
        })
        .where(eq(ebooks.id, existing.id))
        .returning();
      return result[0];
    } else {
      // Create new ebook if it doesn't exist
      const result = await db.insert(ebooks)
        .values({ 
          title: ebookData.title || "Título del E-book",
          description: ebookData.description || "Descripción del E-book",
          coverImage: ebookData.coverImage || "/assets/ebook-cover.jpg",
          price: ebookData.price || "$0",
          salePrice: ebookData.salePrice,
          buyLink: ebookData.buyLink || "#",
          features: ebookData.features || []
        })
        .returning();
      return result[0];
    }
  }
}

export const storage = new DatabaseStorage();
