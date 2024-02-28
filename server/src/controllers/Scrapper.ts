import axios from "axios";
import { Request, Response } from "express";
import { load, CheerioAPI } from "cheerio";
import { createReadStream } from "fs";

type TScrape = {
    scrapeOn: string[]
}

class ScrapeController {
    private spider:CheerioAPI|undefined;

    public async getURIsContent(req:Request, res:Response) {
        const data:TScrape = req.query as TScrape;

        try {
            const decodedScrapeURIs:string[] = data.scrapeOn.map(uri => decodeURIComponent(uri));
            const requests = decodedScrapeURIs.map(async (uri) => {
                const { data:content } = await axios.get(uri);
                return content;
            })
            const URIsContent = await Promise.all(requests);
            console.log(URIsContent);
            return res.status(200).json({content: URIsContent});
        } catch(err) {
            return res.status(400).json({message: err});
        }
    }

    public async loadDocument(content:string) {
        const $ = load(content);
        this.spider = $;
    };
}

export default new ScrapeController();
