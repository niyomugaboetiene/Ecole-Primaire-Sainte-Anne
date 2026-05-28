import express from "express";
import ProductRouter from "./routes/Products.js";
import cors from "cors";
import connection from "./config/db.js";

connection();

const app = express();
app.use(express.json());
app.use(cors());

// * route endpoint
app.use('/products', ProductRouter);


app.listen(5000, () => {
    console.log("http://localhost:5000");
});