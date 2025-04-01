// routes/hash.routes.js
import { Router } from "express";
import { hashText } from "../controllers/hash.controllers.js";

const router = Router();

// Ruta POST para generar el hash del texto
router.post("/api/hash", hashText);

export default router;
