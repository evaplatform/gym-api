import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

router.get("/", UserController.getAll);
router.post("/", UserController.create);

export default router;
