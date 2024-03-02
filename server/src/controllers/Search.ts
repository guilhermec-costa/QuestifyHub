import { Request, Response } from "express";
import axios from "axios";

type TSearchParams = {
    q:string
}

class SearchController {
    public async search(req:Request, res:Response) {
        console.log(req.query);
        const {q:searchQuery} = req.query as TSearchParams;
        const searchEngineId = process.env.SEARCH_ENGINE_ID;
        const apiKey = process.env.SEARCH_ENGINE_API_KEY;
        try {
            const searchResult = await axios.get("https://customsearch.googleapis.com/customsearch/v1", {
                params: {
                    key: apiKey,
                    cx: searchEngineId,
                    q: searchQuery
                }
            });
            return res.status(200).json(searchResult.data);
        } catch(err) {
            console.log("SEARCH ERROR: ", err);
        }
    };
}

export default new SearchController();
