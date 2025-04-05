import express from "express";
import { AcademyController } from "../controllers/AcademyController";

const router = express.Router();

router.get("/", AcademyController.getAll);
router.post("/", AcademyController.create);

export default router;
