import { type User, type InsertUser, type Contact, type InsertContact } from "@shared/schema";
import { UserModel, ContactModel } from "./models";
import mongoose from 'mongoose';
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

// In-memory storage for fallback
export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, _id: id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      _id: id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

// MongoDB storage implementation
class MongoStorage implements IStorage {
  constructor() {
    this.connect();
  }

  private async connect() {
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI not found. Using memory storage fallback.");
      return;
    }

    const connectionString = process.env.MONGODB_URI;
    
    // Validate MongoDB connection string format
    if (!connectionString.startsWith('mongodb://') && !connectionString.startsWith('mongodb+srv://')) {
      console.warn("Invalid MongoDB connection string format. Using memory storage fallback.");
      return;
    }
    
    try {
      await mongoose.connect(connectionString);
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id);
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        _id: user._id.toString(),
        username: user.username,
        password: user.password,
        createdAt: user.createdAt || new Date(),
      };
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return undefined;
      
      return {
        id: user._id.toString(),
        _id: user._id.toString(),
        username: user.username,
        password: user.password,
        createdAt: user.createdAt || new Date(),
      };
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const user = new UserModel(insertUser);
      const savedUser = await user.save();
      
      return {
        id: savedUser._id.toString(),
        _id: savedUser._id.toString(),
        username: savedUser.username,
        password: savedUser.password,
        createdAt: savedUser.createdAt || new Date(),
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const contact = new ContactModel(insertContact);
      const savedContact = await contact.save();
      
      return {
        id: savedContact._id.toString(),
        _id: savedContact._id.toString(),
        name: savedContact.name,
        email: savedContact.email,
        subject: savedContact.subject,
        message: savedContact.message,
        createdAt: savedContact.createdAt || new Date(),
      };
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      const contacts = await ContactModel.find().sort({ createdAt: -1 });
      
      return contacts.map(contact => ({
        id: contact._id.toString(),
        _id: contact._id.toString(),
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        createdAt: contact.createdAt || new Date(),
      }));
    } catch (error) {
      console.error("Error getting contacts:", error);
      return [];
    }
  }
}

// Use MongoDB storage if valid connection string is available, otherwise fallback to memory
export const storage = (process.env.MONGODB_URI && 
  (process.env.MONGODB_URI.startsWith('mongodb://') || process.env.MONGODB_URI.startsWith('mongodb+srv://'))) 
  ? new MongoStorage() 
  : new MemStorage();