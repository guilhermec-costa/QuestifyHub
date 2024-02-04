import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

app.use(express.json());

app.listen(PORT, "127.0.0.1", () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
