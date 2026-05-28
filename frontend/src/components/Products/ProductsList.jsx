import { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
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

    return (
        <div>
            <div>
                <table border={2}>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Product Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map((prod, index) => (
                            <tr key={index}>
                                <td>{prod.Product_Id}</td>
                                <td>{prod.Product_Name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}