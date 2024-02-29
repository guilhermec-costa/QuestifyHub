import axios from "axios";
import { Request, Response } from "express";
import { load, CheerioAPI, Cheerio } from "cheerio";
import redis from "lib/redis";

type TScrape = {
    scrapeOn: string[]
}

const importantTags:string[] = [
    "p",
    "h1", "h2",
    "h3", "h4", "h5",
    "h6", "ul", "ol", "li",
    "a", "span", "article",
    "section", "img", "legend",
    "figcaption", "title"
];

class Scraper {
    public async getRawHTML(req:Request, res:Response) {
        const data:TScrape = req.query as TScrape;

        try {
            const decodedScrapeURIs:string[] = data.scrapeOn.map(uri => decodeURIComponent(uri));
            const requests = decodedScrapeURIs.map(async (uri) => {
                const { data:content } = await axios.get(uri);
                return content;
            });
            const URIsContent = await Promise.all(requests);
            Scraper.cacheRawHTML(URIsContent);


            for(let i=0; i<URIsContent.length; ++i) {
                const preLoadedSpider = Scraper.loadDocumentToScrape(URIsContent.at(i));
                const scrapedContent = Scraper.scrapeDocument(preLoadedSpider, importantTags);
            };

            return res.status(200).json({content: URIsContent});
        } catch(err) {
            return res.status(400).json({message: err});
        }
    };

    private static loadDocumentToScrape(documentContent:string) {
        return load(documentContent);
    }

    private static scrapeDocument(spider:CheerioAPI, allowedSelectors:string[]) {
        let mappedContent = allowedSelectors.reduce((target, current) => {
            target[current] = "";
            return target;
        }, {} as Record<string, string>)
        for(const selector of allowedSelectors) {
            if(selector==="span") {
                const scrapedContent = spider(selector).text();
                console.log(scrapedContent);
            }
        }
        return "ALOOOOOOOOOOOOO";
    }
    
    private static async cacheRawHTML(contents:string[]) {
        const URIS_CONTENT_CACHE:string = "uris_cache_content";
        for(let i=0; i<contents.length; ++i) {
            redis.lpush(URIS_CONTENT_CACHE, contents[i]);
        }
    }

    public async getCachedRawHTML(req:Request, res:Response) {
        const cachedContent = await redis.lrange("uris_cache_content", 0, -1);
        return res.status(200).json(cachedContent);
    }
}

export default new Scraper();
