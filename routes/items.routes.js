import { Router } from "express";
import { getItems, postItem } from "../controllers/items.controllers.js";

const router = Router();

router.get("/items/", getItems);
// router.get("/items/:id", getItem);
router.post("items/", postItem);


export default router;