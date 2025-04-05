// src/routes/userRoutes.ts
import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();

router.get("/users", UserController.getAll);
router.post("/users", UserController.create);

export default router;
