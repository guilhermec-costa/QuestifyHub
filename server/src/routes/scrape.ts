import { Router } from "express";
import { Logger } from "middlewares/logger";
import ScrapeController from "../controllers/Scrapper";

const router = Router();

router.get("/scrape", Logger, ScrapeController.startCrawlingProcess);

export default router;
