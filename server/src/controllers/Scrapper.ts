import axios from "axios";
import { Request, Response } from "express";

type TScrape = {
    scrapeOn: string
}

class ScrapeController {
    public async performCrawl(req:Request, res:Response) {
        const data:TScrape = req.query as TScrape;
        try {
            const scrapeResult = await axios.get(data.scrapeOn);
            return res.sendStatus(200).json(scrapeResult);
        } catch(err) {
            return res.status(400).json()
        }
    }
}

export default new ScrapeController();
