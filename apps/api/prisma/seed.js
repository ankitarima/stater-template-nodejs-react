"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const bcrypt = tslib_1.__importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
function seed() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const email = "admin@local.dev";
            const existingUser = yield prisma.adminUser.findUnique({
                where: { email },
            });
            if (!existingUser) {
                const hashedPassword = yield bcrypt.hash("Asd123!@#", 10);
                yield prisma.adminUser.create({
                    data: {
                        name: "Admin User",
                        email,
                        password: hashedPassword,
                        role: "ADMIN",
                    },
                });
                console.log("Default admin user created.");
            }
            else {
                console.log("Admin user already exists.");
            }
        }
        catch (error) {
            console.error("Error seeding admin user:", error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
seed();
//# sourceMappingURL=seed.js.map