import { Router } from "express";
import  UserController from "../controllers/User";
import { isAuthenticated } from "middlewares/jwtAuth";
import { Logger } from "middlewares/logger";

const router = Router();

router.post("/users", UserController.store);
router.get("/users", isAuthenticated, UserController.all);
router.get("/users/jwt", UserController.viaJwt);
router.get("/users/:id", UserController.byUserId);
router.delete("/users/:id", UserController.delete);

export default router;
