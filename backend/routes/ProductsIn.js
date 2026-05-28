import Product from "../schema/ProductSchema.js";
import express from "express"

const router = express.Router();

router.post('/AddNew', async (req, res) => {
    try {
    const { Product_Name } = req.body;

    if (!Product_Name) {
        return res.status(400).json({ message: 'Please fill out name of product' });
    }

    const newProduct = await Product.create({ Product_Name });

    return res.status(201).json({ message: 'New product added successfully', product: newProduct });
} catch (err) {
    console.error(err);
}

}) 