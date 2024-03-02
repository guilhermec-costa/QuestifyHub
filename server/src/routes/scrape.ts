import { Router } from "express";
import ScrapeController from "../controllers/Scrapper";

const router = Router();

router.get("/scrape", ScrapeController.startCrawlingProcess);
router.post("/clearCachedContent", ScrapeController.clearDocumentsCache);

export default router;
