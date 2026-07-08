import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const dbUrl = new URL(process.env["DATABASE_URL"] as string);

/**
 * Prisma 7 is Rust-free and connects through a driver adapter.
 * The MariaDB adapter is wire-compatible with MySQL.
 */
const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: dbUrl.port ? Number(dbUrl.port) : 3306,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.replace(/^\//, ""),
  connectionLimit: 5,
});

export const db = new PrismaClient({ adapter });
