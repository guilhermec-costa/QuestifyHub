import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./routes/index";
import connectToMongo from "database/db";
import swaggerFile from "../docs.json";
import swaggerUi from "swagger-ui-express";
import {} from "cookie-parser";


dotenv.config();
connectToMongo();
const app: Express = express();
const PORT: any|number = process.env.PORT || 3333;

app.use(cors());
app.use()
app.use(express.json());
/* app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile)); */
app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`QuestifyHub running at port ${PORT}`);
});
