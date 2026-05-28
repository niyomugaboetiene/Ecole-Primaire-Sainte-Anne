import mongoose from "mongoose";


const ProductSchema =new  mongoose.Schema({
    Product_Id: { type: Number, unique: true  },
    Product_Name: { type: String, required: true }
});

const Product = mongoose.model("products", ProductSchema);

export default Product;