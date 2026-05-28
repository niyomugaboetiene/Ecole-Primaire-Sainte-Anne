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
        <div className="bg-sky-100 min-h-screen w-full">
            <div className="">
                <h1 className="text-xl font-bold text-center text-sky-500 mb-2">Products List</h1>
                <div className="max-w-7xl mx-auto w-full">
                  <table border={2} className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Product Id</th>
                            <th className="py-2 px-3 text-left">Product Name</th>
                            <th className="py-2 px-3 text-left">Done at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products?.map((prod, index) => (
                            <tr key={index}>
                                <td>{prod.Product_Id}</td>
                                <td>{prod.Product_Name}</td>
                                <td>{new Date(prod?.createdAt).toLocaleDateString() || "No Date"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
               
            </div>
        </div>
    )
}

export default ProductList;