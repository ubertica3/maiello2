import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSubscriberSchema, 
  insertContactSchema, 
  insertEventSchema, 
  insertBlogPostSchema,
  insertEbookSchema,
  events,
  blogPosts 
} from "@shared/schema";
import { setupAuth, isAuthenticated, isAdmin } from "./auth";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);
  
  // Public API routes
  
  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if subscriber already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      
      if (existingSubscriber) {
        return res.status(400).json({ 
          message: "Este email ya está suscrito a nuestro newsletter." 
        });
      }
      
      // Create new subscriber
      const newSubscriber = await storage.createSubscriber(validatedData);
      
      res.status(201).json({ 
        message: "¡Suscripción exitosa!", 
        subscriber: newSubscriber 
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    }
  });
  
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Create new contact message
      const newContact = await storage.createContact(validatedData);
      
      res.status(201).json({ 
        message: "¡Mensaje enviado con éxito!",
        contact: newContact
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    }
  });
  
  // Get public events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Error al obtener eventos" });
    }
  });
  
  // Get published blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const posts = await storage.getBlogPosts(limit);
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Error al obtener posts del blog" });
    }
  });
  
  // Get ebook information
  app.get("/api/ebook", async (req, res) => {
    try {
      const ebook = await storage.getEbook();
      
      if (!ebook) {
        return res.status(404).json({ message: "E-book no encontrado" });
      }
      
      res.status(200).json(ebook);
    } catch (error) {
      console.error("Error fetching ebook:", error);
      res.status(500).json({ message: "Error al obtener información del e-book" });
    }
  });
  
  // Get single blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      
      if (!post.published) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      
      res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Error al obtener el post" });
    }
  });
  
  // Admin API routes
  
  // Protected admin routes
  // Subscribers
  app.get("/api/admin/subscribers", isAdmin, async (req, res) => {
    try {
      const subscribers = await storage.getSubscribers();
      res.status(200).json(subscribers);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ message: "Error al obtener suscriptores" });
    }
  });
  
  app.delete("/api/admin/subscribers/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSubscriber(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Suscriptor no encontrado" });
      }
      
      res.status(200).json({ message: "Suscriptor eliminado con éxito" });
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      res.status(500).json({ message: "Error al eliminar suscriptor" });
    }
  });
  
  // Contacts
  app.get("/api/admin/contacts", isAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Error al obtener mensajes de contacto" });
    }
  });
  
  app.get("/api/admin/contacts/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contact = await storage.getContact(id);
      
      if (!contact) {
        return res.status(404).json({ message: "Mensaje no encontrado" });
      }
      
      res.status(200).json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ message: "Error al obtener mensaje de contacto" });
    }
  });
  
  app.delete("/api/admin/contacts/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteContact(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Mensaje no encontrado" });
      }
      
      res.status(200).json({ message: "Mensaje eliminado con éxito" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Error al eliminar mensaje" });
    }
  });
  
  // Events management
  app.get("/api/admin/events", isAdmin, async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Error al obtener eventos" });
    }
  });
  
  app.get("/api/admin/events/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }
      
      res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Error al obtener evento" });
    }
  });
  
  app.post("/api/admin/events", isAdmin, async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const newEvent = await storage.createEvent(validatedData);
      
      res.status(201).json({
        message: "Evento creado con éxito",
        event: newEvent
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    }
  });
  
  app.put("/api/admin/events/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertEventSchema.partial().parse(req.body);
      
      const updatedEvent = await storage.updateEvent(id, validatedData);
      
      if (!updatedEvent) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }
      
      res.status(200).json({
        message: "Evento actualizado con éxito",
        event: updatedEvent
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    }
  });
  
  app.delete("/api/admin/events/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteEvent(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Evento no encontrado" });
      }
      
      res.status(200).json({ message: "Evento eliminado con éxito" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Error al eliminar evento" });
    }
  });
  
  // Blog management
  app.get("/api/admin/blog", isAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts(undefined, true);
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Error al obtener posts del blog" });
    }
  });
  
  app.get("/api/admin/blog/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      
      res.status(200).json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Error al obtener post del blog" });
    }
  });
  
  app.post("/api/admin/blog", isAdmin, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      
      if (!validatedData.authorId) {
        validatedData.authorId = req.user.id;
      }
      
      const newPost = await storage.createBlogPost(validatedData);
      
      res.status(201).json({
        message: "Post creado con éxito",
        post: newPost
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    }
  });
  
  app.put("/api/admin/blog/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      
      const updatedPost = await storage.updateBlogPost(id, validatedData);
      
      if (!updatedPost) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      
      res.status(200).json({
        message: "Post actualizado con éxito",
        post: updatedPost
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    }
  });
  
  app.delete("/api/admin/blog/:id", isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      
      res.status(200).json({ message: "Post eliminado con éxito" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Error al eliminar post" });
    }
  });
  
  // Ebook management
  app.get("/api/admin/ebook", isAdmin, async (req, res) => {
    try {
      const ebook = await storage.getEbook();
      res.status(200).json(ebook || {});
    } catch (error) {
      console.error("Error fetching ebook:", error);
      res.status(500).json({ message: "Error al obtener información del e-book" });
    }
  });
  
  app.put("/api/admin/ebook", isAdmin, async (req, res) => {
    try {
      const validatedData = insertEbookSchema.partial().parse(req.body);
      
      const updatedEbook = await storage.updateEbook(validatedData);
      
      res.status(200).json({
        message: "E-book actualizado con éxito",
        ebook: updatedEbook
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    }
  });
  
  // Site settings
  app.get("/api/admin/settings/:section", isAdmin, async (req, res) => {
    try {
      const section = req.params.section;
      const settings = await storage.getSiteSettings(section);
      
      if (!settings) {
        return res.status(404).json({ message: "Configuración no encontrada" });
      }
      
      res.status(200).json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Error al obtener configuración" });
    }
  });
  
  app.put("/api/admin/settings/:section", isAdmin, async (req, res) => {
    try {
      const section = req.params.section;
      const settings = req.body;
      
      const updatedSettings = await storage.updateSiteSettings(section, settings);
      
      res.status(200).json({
        message: "Configuración actualizada con éxito",
        settings: updatedSettings
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      res.status(500).json({ message: "Error al actualizar configuración" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
