import express from "express";
import session from "express-session";

import ProductRouter from "./routes/Products.js";
import StockInRouter from "./routes/StockIn.js";
import StockOutRouter from "./routes/StockOut.js";

import cors from "cors";
import connection from "./config/db.js";

import AuthRoute from "./routes/Auth.js";


connection();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(session({
    secret: 'my-scret-key',
    resave: false,
    saveUninitialized: true, 
    cookie: { httpOnly: true }
}));

// * route endpoint
app.use('/products', ProductRouter);
app.use('/stockIn', StockInRouter);
app.use('/stockOut', StockOutRouter);

// ? auth
app.use('/auth', AuthRoute);


app.listen(5000, () => {
    console.log("http://localhost:5000");
});