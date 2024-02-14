import { Router } from "express";
import  UserController from "../controllers/User";
import UserSchemaValidation from "../validations/UserValidation";


const router = Router();

router.post("/users", UserController.store);

export default router;
