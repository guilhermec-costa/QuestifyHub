import axios from "axios";
import { Request, Response } from "express";
import { load, CheerioAPI } from "cheerio";
import redis from "lib/redis";

type TScrape = {
    scrapeOn: string[]
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
        const data:TScrape = req.query as TScrape;
        console.log(data);
        const decodedScrapeURIs:string[] = data.scrapeOn.map(uri => decodeURIComponent(uri));

        try {
            const cachedScrapedDocuments = await Scraper.getAllScrapedDocuments([...Array(decodedScrapeURIs.length).keys()]);
            return res.status(200).json(cachedScrapedDocuments);
        } catch(err) {
            const requests = decodedScrapeURIs.map(
                                    async (uri) => await axios.get(uri).then(response => response.data));

            const URIsContent = await Promise.all(requests);

            for(let i=0; i<URIsContent.length; ++i) {
                const preLoadedSpider = Scraper.loadDocumentToScrape(URIsContent.at(i));
                const scrapedContent = Scraper.scrapeDocument(preLoadedSpider, selectors);
                await Scraper.cacheScrapedDocument(i, scrapedContent);
            };
            
            const everythingScraped = await Scraper.getAllScrapedDocuments([...Array(decodedScrapeURIs.length).keys()]);
            return res.status(400).json(everythingScraped);
        }
    };

    private static loadDocumentToScrape(documentContent:string) {
        return load(documentContent);
    }

    private static async cacheScrapedDocument(documentId:number, scrapedDocument:Record<string, string[]>) {
        const stringifiedMap = JSON.stringify(scrapedDocument);
        await redis.set(documentId.toString(), stringifiedMap, (err, ok) => {
            console.log(err ? `Error: ${err}` : `Success: ${ok}`);
        });
        return;
    }

    private static async getScrapedDocument(documentId:number) {
        return await redis.get(documentId.toString());
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
            target[currentSelector] = tagOccurencies.map(occurency => Scraper.cleanScrapeContent(spider(occurency).text()))
                                                    .filter(ocurrency => ocurrency !== "");
            return target;
        }, {} as Record<string, string[]>);
        return mappedContent;
    }

   private static cleanScrapeContent(content:string) {
        return content.replace(/\s+/g, " ").trim();
    };
}

export default new Scraper();
