import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect("mongodb://localhost/QuestigyHub")
    .then(() => console.log("Connected to mongo database"))
    .catch(err => console.log(err));
    

const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

app.listen(PORT, "127.0.0.1", () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
