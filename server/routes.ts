import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactNotification } from "./sendgrid";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notification
      try {
        await sendContactNotification({
          name: contact.name,
          email: contact.email,
          subject: contact.subject,
          message: contact.message,
          submittedAt: contact.createdAt
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
        // Continue even if email fails
      }
      
      res.json({ success: true, message: "Message sent successfully!", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again." 
        });
      }
    }
  });

  // Get all contacts (for potential admin interface)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch contacts" 
      });
    }
  });

  // Resume download endpoint
  app.get("/api/resume", (req, res) => {
    // Redirect to the Google Drive resume link
    res.redirect(302, "https://drive.google.com/file/d/1r2-fxbTEEnLe4_r090JDeHBNILQW5D12/view?usp=sharing");
  });

  const httpServer = createServer(app);
  return httpServer;
}
