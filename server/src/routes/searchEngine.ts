import { Router } from "express";
import { Logger } from "middlewares/logger";
import SearchController from "controllers/Search";

const router = Router();

router.get("/search", Logger, SearchController.search);

export default router;
