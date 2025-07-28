import { z } from "zod";

// MongoDB Schemas using Zod
export const userSchema = z.object({
  _id: z.string().optional(), // MongoDB ObjectId
  username: z.string().min(1),
  password: z.string().min(1),
  createdAt: z.date().default(() => new Date()),
});

export const contactSchema = z.object({
  _id: z.string().optional(), // MongoDB ObjectId
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
  createdAt: z.date().default(() => new Date()),
});

// Insert schemas (without _id and createdAt)
export const insertUserSchema = userSchema.omit({ 
  _id: true,
  createdAt: true 
});

export const insertContactSchema = contactSchema.omit({ 
  _id: true,
  createdAt: true 
});

// TypeScript types
export type User = z.infer<typeof userSchema> & { id: string };
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Contact = z.infer<typeof contactSchema> & { id: string };
export type InsertContact = z.infer<typeof insertContactSchema>;