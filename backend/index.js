import express from "express";

import ProductRouter from "./routes/Products.js";
import StockInRouter from "./routes/StockIn.js";
import StockOutRouter from "./routes/StockOut.js";

import cors from "cors";
import connection from "./config/db.js";


connection();

const app = express();
app.use(express.json());
app.use(cors());

// * route endpoint
app.use('/products', ProductRouter);
app.use('/stockIn', StockInRouter);
app.use('/stockOut', StockOutRouter);


app.listen(5000, () => {
    console.log("http://localhost:5000");
});