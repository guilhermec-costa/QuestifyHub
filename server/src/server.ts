import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index";

dotenv.config();
mongoose.connect("mongodb://localhost/QuestifyHub")
    .then(() => console.log("Connected to mongo database"))
    .catch(err => console.log(err));
    

const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(indexRouter);

app.get("/", (req, res) => {
    return res.send("Hello");
})

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
