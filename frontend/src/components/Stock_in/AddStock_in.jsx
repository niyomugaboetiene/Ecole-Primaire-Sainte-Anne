import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const AddStockIn = () => {
    // Product_Id, Date, Quantity, Unit_price
    const [Product_Id, setProduct_Id] = useState(null);
    const [Date, setDate] = useState(null);
    const [Quantity, setQuantity] = useState(0);
    const [Unit_price, setUnit_price] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const [products, setProducts] = useState(null);

    const handleGetProducts = async () => {
       try {
           const res = await axios.get('http://localhost:5000/products/list')

           setProducts(res.data.list);
       } catch (err) {
        console.error(err);
       }
    }

    useEffect(() => {
        handleGetProducts();
    }, []);

    const handleAddStock = async () => {
        try {
            
        }
    }
}