import { Router } from "express";
import userRoutes from "./users";
import authRoutes from "./auth";

const router = Router();

router.use(userRoutes);
router.use(authRoutes);

export default router;

