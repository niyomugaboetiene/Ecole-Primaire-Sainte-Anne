import { useState, useEffect } from "react";
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
            setLoading(true);
            const res = await axios.post('http://localhost:5000/stockIn/AddNew', { Product_Id, Date, Quantity, Unit_price });
            setMessage(res.data.message);
            setLoading(false);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occured";
            setError(errorMessage);
        }
    }

    return (
        <div className="bg-sky-200 min-h-screen flex justify-center items-center ">
            <div className="bg-white p-3 h-fit w-100 rounded-lg shadow-lg">
                <div>
                    {message && (
                        <div className="bg-green-200 py-2 rounded-lg p-2 font-bold text-green-600 mb-3">
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-200 py-2 rounded-lg p-2 font-bold text-red-600 mb-3">
                            {error}
                        </div>
                    )}
                </div>

                    <h1 className="text-center text-gray-700 font-bold text-lg">Add Stock In</h1>
                <div className="mt-2">
                    <label htmlFor="" className="text-gray-800 text-lg block">Products</label>
                    <select 
                       className="w-full bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                       onChange={(e) => setProduct_Id(e.target.value)}
                    >
                      {products?.map((prod, index) => (
                        <option key={index} value={prod._id}>{prod.Product_Name}</option>
                      ))}
                    </select> 
                </div>
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Date</label>
                 <input type="date" 
                     placeholder="Enter Product Name" 
                     className="w-full bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setDate(e.target.value)} />
                </div>
                
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Qauntity</label>
                 <input type="number" 
                     placeholder="Enter Product Quantity" 
                     className="w-full px-3 bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setQuantity(e.target.value)} />
                </div>
                
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Date</label>
                 <input type="number" 
                     placeholder="Enter Unit price" 
                     className="w-full px-3 bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setUnit_price(e.target.value)} />
                </div>

                <button onClick={handleAddStock} className="w-full flex justify-center items-center  mt-6 bg-sky-300 py-2 gap-3 text-white font-bold rounded-full hover:bg-sky-400 transition-colors"><FaPlus />Add</button>
            </div>
        </div>
    )
}

export default AddStockIn;