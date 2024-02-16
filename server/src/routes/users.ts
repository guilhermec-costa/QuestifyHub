import { Router } from "express";
import  UserController from "../controllers/User";
import { isAuthenticated } from "middlewares/jwtAuth";

const router = Router();

router.post("/users", UserController.store);
router.get("/users", isAuthenticated, UserController.all);
router.get("/users/:id", UserController.byUserId);
router.delete("/users/:id", UserController.delete);

export default router;
