import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import connectToMongo from "database/db";
import swaggerFile from "../docs.json";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;
connectToMongo();

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(express.json());
app.use(cookieParser());
/* app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); */
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
