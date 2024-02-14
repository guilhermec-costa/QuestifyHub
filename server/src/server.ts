import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import indexRouter from "./routes/index";

dotenv.config();
mongoose.connect("mongodb://127.0.0.1:27017/Questifyhub")
    .then(() => console.log("connected to database"))
    .catch(e => console.log("Error: ", e.message));
    
const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(indexRouter);

app.get("/", (req, res) => {
    console.log("AQUI NO GET");
    return res.send({msg: "foi"});
})

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
