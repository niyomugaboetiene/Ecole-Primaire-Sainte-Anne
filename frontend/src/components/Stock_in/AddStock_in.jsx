import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const AddStockIn = () => {
    // Product_Id, Date, Quantity, Unit_price
    const [Product_Id, setProduct_Id] = useState(null);
    const [Date, setDate] = useState(null);
    const [Quantity, setQuantity] = useState(0);
    const [Unit_price, setUnit_price] = useState(0);
}