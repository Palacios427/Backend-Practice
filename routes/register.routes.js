import { Router } from "express";
import { registerUser } from "../controllers/register.controllers.js";

const router = Router();

router.post("/api/register", registerUser);

export default router;
