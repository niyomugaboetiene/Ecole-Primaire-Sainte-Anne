import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StockInList = () => {
    const [stockIn, setStockIn] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const navigate = useNavigate();

    const handleGetStock = async () => {
       try {
           const res = await axios.get('http://localhost:5000/stockIn/list')

           setStockIn(res.data.list);
           console.log("P name", res.data.list);
       } catch (err) {
        console.error(err);
                   const errorMessage = err.response?.data?.message || "Error occured";
            if (errorMessage === "Login first.") {
               setIsAuthorized(false);
           }
       }
    }

    useEffect(() => {
        handleGetStock();
    }, []);

    const handlDeleteStock = async (_id) => {
        try {
            const confirm = window.confirm("Are you sure ?");
            if (confirm){
                await axios.delete(`http://localhost:5000/stockIn/delete/${_id}`);
                await handleGetStock();
            }
        } catch (err) {
            console.error(err);
                       const errorMessage = err.response?.data?.message || "Error occured";
            if (errorMessage === "Login first.") {
               setIsAuthorized(false);
           }
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
        <div className="bg-sky-100 min-h-screen w-full">
            <div className="">
                <h1 className="text-xl font-bold text-center text-sky-500 mb-2">Stock In List</h1>
                <div className="max-w-7xl mx-auto w-full">
                  <table border={2} className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Product Name</th>
                            <th className="py-2 px-3 text-left">Date</th>
                            <th className="py-2 px-3 text-left">Quantity</th>
                            <th className="py-2 px-3 text-left">Price Unit</th>
                            <th className="py-2 px-3 text-left">Total Price</th>
                            <th className="py-2 px-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockIn?.map((prod, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-sky-200 hover:bg-sky-300 transition-colors' : 'bg-gray-200 hover:bg-gray-300 transition-colors text-gray-800 font-bold'}>
                                <td className="py-3 px-3 text-left ">{prod.Product_Id?.Product_Name}</td>
                                <td className="py-3 px-3 text-left">{new Date(prod.Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3 text-left ">{prod.Quantity}</td>
                                <td className="py-3 px-3 text-left ">{prod.Unit_price}</td>
                                <td className="py-3 px-3 text-left ">{prod.Total_price}</td>

                                <td className="flex justify-between">
                                    <Link to={`/stockIn/update/${prod._id}`} className="inline-flex bg-green-300 rounded-lg hover:bg-green-400  transition-colors text-white py-2 px-4 mt-2"><FaEdit /> Update</Link>
                                    <button className="inline-flex bg-red-300 rounded-lg hover:bg-red-400  transition-colors text-white py-2 px-4 mt-2" onClick={() => handlDeleteStock(prod._id)}><FaTrash /> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
               
            </div>
        </div>
    )
}

export default StockInList;