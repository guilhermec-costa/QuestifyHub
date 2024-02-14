import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index";

dotenv.config();
mongoose.connect(process.env.MONGODB_URI as string, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER
})
    
const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
