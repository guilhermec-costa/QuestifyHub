import axios from "axios";
import { Request, Response } from "express";

type TScrape = {
    scrapeOn: string
}

class ScrapeController {
    public async performCrawl(req:Request, res:Response) {
        const data:TScrape = req.query as TScrape;
        const decodedScrapeURI = decodeURIComponent(data.scrapeOn);
        console.log(decodedScrapeURI);
        try {
            const { data } = await axios.get(decodedScrapeURI);
            return res.status(200).json({content: data});
        } catch(err) {
            return res.status(400).json({message: err});
        }
    }
}

export default new ScrapeController();
