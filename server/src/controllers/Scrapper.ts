import axios from "axios";
import { Request, Response } from "express";
import { load, CheerioAPI } from "cheerio";
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
    public async scrape(req:Request, res:Response) {
        const data:TScrape = req.query as TScrape;

        try {
            const decodedScrapeURIs:string[] = data.scrapeOn.map(uri => decodeURIComponent(uri));
            const requests = decodedScrapeURIs.map(
                                    async (uri) => await axios.get(uri).then(response => response.data));

            const URIsContent = await Promise.all(requests);

            for(let i=0; i<URIsContent.length; ++i) {
                const preLoadedSpider = Scraper.loadDocumentToScrape(URIsContent.at(i));
                const scrapedContent = Scraper.scrapeDocument(preLoadedSpider, importantTags, i);
                Scraper.cacheScrapedDocument(i, scrapedContent);
            };

            return res.status(200).json({content: URIsContent});
        } catch(err) {
            return res.status(400).json({message: err});
        }
    };

    private static loadDocumentToScrape(documentContent:string) {
        return load(documentContent);
    }

    private static cacheScrapedDocument(documentId:number, scrapedDocument:Record<string, string>) {
        redis.hset(documentId.toString(), scrapedDocument);
    }

    private static scrapeDocument(spider:CheerioAPI, allowedSelectors:string[], documentId:number) {
        let mappedContent = allowedSelectors.reduce((target, currentSelector) => {
            target[currentSelector] = spider(currentSelector).text();
            return target;
        }, {} as Record<string, string>)
        return mappedContent;
    }

    public async getCachedRawHTML(req:Request, res:Response) {
        const cachedContent = await redis.lrange("uris_cache_content", 0, -1);
        return res.status(200).json(cachedContent);
    }
}

export default new Scraper();
