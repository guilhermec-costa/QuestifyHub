import axios from "axios";
import { Request, Response } from "express";
import { load, CheerioAPI } from "cheerio";
import redis from "lib/redis";

type TScrapeParams = {
    scrapeOn: string[]
}

type TClearCacheParams = {
    documentsId:string[]
}

const selectors:string[] = [
    "p",
    "h1", 
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "span",
    "article",
    "section"
];

class Scraper {
    public async startCrawlingProcess(req:Request, res:Response) {
        const data:TScrapeParams = req.query as TScrapeParams;
        if(!Object.keys(data).length) return res.sendStatus(400);
        const decodedScrapeURIs:string[] = data.scrapeOn.map(uri => decodeURIComponent(uri));

        try {
            const cachedScrapedContent = await Scraper.getAllScrapedDocuments([...Array(decodedScrapeURIs.length).keys()]);
            if(cachedScrapedContent.every(content => content === undefined)) {
                throw new Error("Not possible to get cache");
            };
            return res.status(200).json(cachedScrapedContent);
        } catch(err) {
            console.log(err);
            const requests = decodedScrapeURIs.map(
                                    async (uri) => await axios.get(uri).then(response => response.data));

            const URIsContent = await Promise.all(requests);

            for(let i=0; i<URIsContent.length; ++i) {
                const preLoadedSpider = Scraper.loadDocumentToScrape(URIsContent.at(i));
                const scrapedContent = Scraper.scrapeDocument(preLoadedSpider, selectors);
                await Scraper.cacheScrapedDocument(i, scrapedContent);
            };
            
            const everythingScraped = await Scraper.getAllScrapedDocuments([...Array(decodedScrapeURIs.length).keys()]);
            return res.status(200).json({content: everythingScraped});
        }
    };

    private static loadDocumentToScrape(documentContent:string) {
        return load(documentContent);
    }

    private static async cacheScrapedDocument(documentId:number, scrapedDocument:Record<string, string[]>) {
        /* const filteredScrapedDocument = scrapedDocument[documentId].filter(i => i.length > 1); */
        const stringifiedContent = JSON.stringify(scrapedDocument);
        await redis.set(documentId.toString(), stringifiedContent, (err, ok) => {
            console.log(err ? `Error: ${err}` : `Success: ${ok}`);
        });
        return;
    }

    private static async getScrapedDocument(documentId:number) {
        const content = await redis.get(documentId.toString());
        if(content) return content;
        return;
    }

    private static async getAllScrapedDocuments(documentsIds:number[]) {
        const allScrapes = await Promise.all(
            documentsIds.map(async (id) => await Scraper.getScrapedDocument(id))
        );

        return allScrapes; 
    }
    private static scrapeDocument(spider:CheerioAPI, allowedSelectors:string[]) {
        let mappedContent = allowedSelectors.reduce((target, currentSelector) => {
            const tagOccurencies = spider(currentSelector).get();
            target[currentSelector] = tagOccurencies.map(occurency => Scraper.cleanScrapedString(spider(occurency).text()))
                                                    .filter(ocurrency => ocurrency !== "");
            return target;
        }, {} as Record<string, string[]>);
        return mappedContent;
    }

    private static cleanScrapedString(content:string) {
        return content.replace(/\s+/g, " ").trim();
    };

    public async clearDocumentsCache(req:Request, res:Response) {
        const params:TClearCacheParams = req.body as TClearCacheParams;
        await Promise.all(params.documentsId.map(async (id) => await redis.del(id)))
        return res.sendStatus(200);
    }
}

export default new Scraper();
