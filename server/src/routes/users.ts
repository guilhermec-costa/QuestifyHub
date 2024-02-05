import { Router } from "express";
import  UserController from "../controllers/User";
import UserSchemaValidation from "../validations/UserValidation";


const router = Router();

router.post("/users", (req, res) => UserController.store(req, res, UserSchemaValidation));

export default router;
