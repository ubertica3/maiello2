import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
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

  const httpServer = createServer(app);

  return httpServer;
}
