import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    Product_Id: { type: mongoose.Schema.Types.ObjectId },
    Product_Name: { type: String, required: true }
});

const Product = mongoose.model("products", ProductSchema);

export default Product;