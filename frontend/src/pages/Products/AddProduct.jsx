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
            
        }
    }
}