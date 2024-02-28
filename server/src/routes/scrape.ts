import { Router } from "express";
import ScrapeController from "../controllers/Scrapper";

const router = Router();

router.get("/scrape", ScrapeController.getURIsContent);
router.get("/scrape/cachedContents", ScrapeController.getCachedPagesContent);

export default router;
