import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as bcrypt from "bcryptjs";

const dbUrl = new URL(process.env["DATABASE_URL"] as string);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: dbUrl.port ? Number(dbUrl.port) : 3306,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace(/^\//, ""),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function seed() {
  try {
    const email = "admin@local.dev";
    const existingUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("Asd123!@#", 10);

      await prisma.adminUser.create({
        data: {
          name: "Admin User",
          email,
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      console.log("Default admin user created.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
