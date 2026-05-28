import express from "express";
import ProductRouter from "./routes/Products.js";
import cors from "cors";
import connection from "./config/db.js";

connection();

const app = express();
app.use(cors());

// * route endpoint
