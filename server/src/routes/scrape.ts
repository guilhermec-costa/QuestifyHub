import { Router } from "express";
import ScrapeController from "../controllers/Scrapper";

const router = Router();

router.get("/scrape", ScrapeController.startCrawlingProcess);

export default router;
