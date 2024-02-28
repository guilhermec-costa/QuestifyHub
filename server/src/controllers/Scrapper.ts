import axios from "axios";
import { Request, Response } from "express";
import { load, CheerioAPI } from "cheerio";
import redis from "lib/redis";

type TScrape = {
    scrapeOn: string[]
}

class ScrapeController {
    public async getURIsContent(req:Request, res:Response) {
        const data:TScrape = req.query as TScrape;

        try {
            const decodedScrapeURIs:string[] = data.scrapeOn.map(uri => decodeURIComponent(uri));
            const requests = decodedScrapeURIs.map(async (uri) => {
                const { data:content } = await axios.get(uri);
                return content;
            });
            const URIsContent = await Promise.all(requests);
            ScrapeController.cacheContents(URIsContent);
            return res.status(200).json({content: URIsContent});
        } catch(err) {
            return res.status(400).json({message: err});
        }
    }
    
    public static async cacheContents(contents:string[]) {
        const URIS_CONTENT_CACHE:string = "uris_cache_content";
        for(let i=0; i<contents.length; ++i) {
            redis.lpush(URIS_CONTENT_CACHE, contents[i]);
        }
    }

    public async getCachedPagesContent(req:Request, res:Response) {
        const cachedContent = await redis.lrange("uris_cache_content", 0, -1);
        return res.status(200).json(cachedContent);
    }
}

export default new ScrapeController();
