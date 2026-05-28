import mongoose from "mongoose";

const Stock_OutSchema = mongoose.Schema({
    Product_Id: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    Date: { type: Date, default: Date.now },
    Quantity: { type: Number, required: true },
});

const Stock_Out = mongoose.model("stock_outs", Stock_OutSchema);

export default Stock_Out;