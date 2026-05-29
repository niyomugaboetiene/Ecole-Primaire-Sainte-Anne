import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const AddStockOut = () => {
    // Product_Id, Date, Quantity, Unit_price
    const [Product_Id, setProduct_Id] = useState(null);
    const [Date, setDate] = useState(null);
    const [Quantity, setQuantity] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [isAuthorized, setIsAuthorized] = useState(true);

    const navigate = useNavigate();
    
    const [products, setProducts] = useState(null);

    const handleGetProducts = async () => {
       try {
           const res = await axios.get('http://localhost:5000/products/list')

           setProducts(res.data.list);
       } catch (err) {
        console.error(err);
        const errorMessage = err.response?.data.message || "Error occured";
        if (errorMessage === "Login first.") {
            setIsAuthorized(false);
        }
       }
    }

    useEffect(() => {
        handleGetProducts();
    }, []);

    const handleAddStockOut = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/stockOut/AddNew', { Product_Id, Date, Quantity });
            setMessage(res.data.message);
            setLoading(false);
            setTimeout(() => {
                navigate('/stockOut/list');
            }, 2000);
            setError("");
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occured";
            if (errorMessage === "Login first.") {
               setIsAuthorized(false);
           }
            setError(errorMessage);
            setMessage("");
        }
    }

    if (!isAuthorized) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-yellow-200 p-3 h-fit rounded-lg">
                   <h1 className="text-center text-2xl font-bold text-yellow-700 mb-4">Security Alert</h1>
                   <p className="text-yellow-900">You are not authorized. do to this you can login first of all.</p>
                   <button className="bg-sky-400 flex justify-center items-center gap-2 w-1/2 mt-3 py-3 rounded-full ms-25 text-white font-bold hover:bg-sky-600" onClick={() =>navigate('/auth/login')}><FaSignInAlt /> Login</button>
                </div>
            </div>
        )
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

                    <h1 className="text-center text-gray-700 font-bold text-lg">Add Stock Out</h1>
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
                     className="w-full px-3 bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setDate(e.target.value)} />
                </div>
                
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Qauntity</label>
                 <input type="number" 
                     placeholder="Enter Product Quantity" 
                     className="w-full px-3 bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setQuantity(e.target.value)} />
                </div>

                <button onClick={handleAddStockOut} className="w-full flex justify-center items-center  mt-6 bg-sky-300 py-2 gap-3 text-white font-bold rounded-full hover:bg-sky-400 transition-colors"><FaPlus />Add</button>
            </div>
        </div>
    )
}

export default AddStockOut;