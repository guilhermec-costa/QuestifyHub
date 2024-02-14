import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import connectToMongo from "database/db";

dotenv.config();
console.log();
connectToMongo(process.env.MONGODB_URI as string);
const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
