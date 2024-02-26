import { Router } from "express";
import userRoutes from "./users";
import authRoutes from "./auth";
import searchRoutes from "./searchEngine";
import scrapeRoutes from "./scrape";

const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(searchRoutes);
router.use(scrapeRoutes);

export default router;

