import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [Product_Id, setProduct_Id] = useState(0);
    const [Product_Name, setProduct_Name] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const handleAddProduct = async () => {
        try {
            if (!Product_Id || !Product_Name) {
                setMessage("Fill out all missing fields");
            }
            
            setIsLoading(true);
            const res = await axios.post('http://localhost:5000/products/AddNew', { Product_Id, Product_Name });
            setMessage(res.data.message);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error occured";
            console.error(err);
            setError(errorMessage);
        }
    }
}