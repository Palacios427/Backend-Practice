import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import itemsRoutes from "./routes/items.routes.js"
import items2Routes from "./routes/items2.routes.js"
import items3Routes from "./routes/items3.routes.js"
import loginRoutes from "./routes/login.routes.js";
import { connectDB } from "./utils/mongodb.js";
import hashRoutes from "./routes/hash.routes.js";
import registerRoutes from "./routes/register.routes.js";

const app = express();

// connectDB();

app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(indexRoutes);
app.use(itemsRoutes);
// app.use(items2Routes);
app.use(items3Routes);
app.use(loginRoutes);
app.use(hashRoutes);
app.use(registerRoutes);

app.listen(5000, console.log("http://localhost:5000"));