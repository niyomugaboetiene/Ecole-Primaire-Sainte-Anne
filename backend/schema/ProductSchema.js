import mongoose from "mongoose";
import AutoIncrementFactory  from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const ProductSchema =new  mongoose.Schema({
    Product_Id: { type: Number, unique: true  },
    Product_Name: { type: String, required: true }
});

mongoose.plugin(AutoIncrement, {inc_fields:  "Product_Id" } );
const Product = mongoose.model("products", ProductSchema);

export default Product;