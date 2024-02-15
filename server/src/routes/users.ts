import { Router } from "express";
import  UserController from "../controllers/User";
import { isAuthenticated } from "middlewares/jwtAuth";

const router = Router();

router.post("/users", isAuthenticated, UserController.store);
router.get("/users", UserController.all);
router.get("/users/:id", UserController.byUserId);
router.delete("/users/:id", UserController.delete);

export default router;
