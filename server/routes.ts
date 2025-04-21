import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for handling newsletter subscriptions
  app.post("/api/subscribe", async (req, res) => {
    try {
      // Validate the request body using the schema
      const data = insertSubscriptionSchema.parse(req.body);
      
      // Save the subscription to storage
      const subscription = await storage.createSubscription(data);
      
      // Return success response
      res.status(201).json({ 
        message: "Subscription created successfully",
        subscription 
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid subscription data", 
          errors: error.errors 
        });
      }
      
      // Handle other errors
      console.error("Subscription error:", error);
      res.status(500).json({ 
        message: "Failed to create subscription" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
