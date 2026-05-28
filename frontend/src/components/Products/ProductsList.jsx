import { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState(null);
    

    const handleGetProducts = async () => {
       try {
           const res = await axios.get('http://localhost:5000/products/list')
       }
    }
}