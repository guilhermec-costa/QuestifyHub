import { Router } from "express";
import  UserController from "../controllers/User";

const router = Router();

router.post("/users", UserController.store);
router.get("/users", UserController.all);
router.get("/users/:id", UserController.byUserId);
router.delete("/users/:id", UserController.delete);

export default router;
