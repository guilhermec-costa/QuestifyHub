import { Router } from "express";
import ScrapeController from "../controllers/Scrapper";

const router = Router();

router.get("/scrape", ScrapeController.scrape);
router.get("/scrape/cachedContents", ScrapeController.getCachedRawHTML);

export default router;
