import express from "express";
import authRouter from "@routes/auth/index.routes";
import { protect } from "@middlewares/auth.middleware";

const router = express.Router();

//@ts-ignore
router.get("/health-check", (_, res) => res.sendStatus(200));

//Public routes
router.use("/auth", authRouter);

// protected routes
router.use(protect);

export default router;
