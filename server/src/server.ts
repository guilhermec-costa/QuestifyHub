import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import connectToMongo from "database/db";
import { config } from "../swagger.json";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
connectToMongo();
const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

const swaggerSpecs = config;
app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
