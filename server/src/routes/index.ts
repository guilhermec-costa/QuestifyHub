import { Router } from "express";
import userRoutes from "./users";
import authRoutes from "./auth";
import searchRoutes from "./searchEngine";

const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(searchRoutes);

export default router;

