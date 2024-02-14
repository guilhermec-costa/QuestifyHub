import { Router } from "express";
import  UserController from "../controllers/User";


const router = Router();

router.post("/users", UserController.store);
router.get("/users", UserController.all);

export default router;
