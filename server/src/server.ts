import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import connectToMongo from "database/db";
import cookieParser from "cookie-parser";
import OpenAI from "openai";

dotenv.config();

const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;
connectToMongo();
const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

/* const completion = openai.chat.completions.create({ */
/*     messages: [{ role: "system", content: "You are a helpful assistant." }], */
/*     model: "gpt-3.5-turbo", */
/* }); */
/* console.log(completion.then(response => response.choices[0])); */

const corsOptions = {
  origin: '*',
  methods: 'GET,POST, PUT, PATCH, OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
  preflightContinue: false,
};

app.use(express.json());
app.use(cors(
    corsOptions
));
app.use(cookieParser());
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
