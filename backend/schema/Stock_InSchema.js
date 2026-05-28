import mongoose from "mongoose";

const Stock_InSchema = mongoose.Schema({
    Product_Id: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    Date: { type: Date, default: Date.now },
    Quantity: { type: Number, required: true },
    Unit_price: { type: Number, required: true },
    Total_price: { type: Number }
});

const Stock_In = mongoose.model("stock_ins", Stock_InSchema);

export default Stock_In;