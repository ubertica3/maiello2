import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { type User, type InsertUser } from "@shared/schema";
import { log } from "./vite";

declare global {
  namespace Express {
    // Extend the User interface without creating a circular reference
    interface User {
      id: number;
      username: string;
      name?: string;
      email?: string;
      role: string;
      password: string;
    }
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Check if user is authenticated
export function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "No autenticado" });
}

// Check if user is admin
export function isAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Acceso no autorizado" });
}

export function setupAuth(app: Express) {
  // Set up express-session
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "supersecret-changeme-in-production",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: 'lax'
    }
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Usuario o contraseña incorrectos" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Register routes
  app.post("/api/admin/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || "Autenticación fallida" });
      }
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Acceso no autorizado" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ 
          message: "Inicio de sesión exitoso",
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      });
    })(req, res, next);
  });

  app.post("/api/admin/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }
      res.status(200).json({ message: "Sesión cerrada exitosamente" });
    });
  });

  app.get("/api/admin/session", (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
      res.status(200).json({
        authenticated: true,
        user: {
          id: req.user.id,
          username: req.user.username,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role
        }
      });
    } else {
      res.status(200).json({ authenticated: false });
    }
  });

  // Create admin user if doesn't exist
  createAdminUserIfNeeded();
}

async function createAdminUserIfNeeded() {
  try {
    const adminUser = await storage.getUserByUsername("admin");
    
    if (!adminUser) {
      log("Admin user not found, creating default admin user", "auth");
      
      const adminUserData: InsertUser = {
        username: "admin",
        password: await hashPassword("123456"),
        name: "Admin",
        email: "admin@example.com",
        role: "admin"
      };
      
      await storage.createUser(adminUserData);
      log("Default admin user created", "auth");
    }
  } catch (error) {
    console.error("Error checking/creating admin user:", error);
  }
}