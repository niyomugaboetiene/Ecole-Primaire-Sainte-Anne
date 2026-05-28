import { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateStockIn = () => {
    // Product_Id, Date, Quantity, Unit_price
    const [Product_Id, setProduct_Id] = useState(null);
    const [Date, setDate] = useState(null);
    const [Quantity, setQuantity] = useState(0);
    const [Unit_price, setUnit_price] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const { _id } = useParams();

    const navigate = useNavigate();
    
    const [products, setProducts] = useState(null);

    const handleGetStock = async () => {
       try {
           const res = await axios.get('http://localhost:5000/stockIn/list')

           const stocksIn =  res.data.list;
           setDate(new Date(stocksIn.Date).isoString().split('')[0]);
           setProduct_Id(stocksIn.Product_Id);
           setQuantity(stocksIn.Quantity);
           setUnit_price(stocksIn.Unit_price);
        //    console.log("P name", res.data.list);
       } catch (err) {
        console.error(err);
       }
    }

    useEffect(() => {
        handleGetStock();
    }, []);

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

    const handleUpdateStock = async () => {
        try {
            setLoading(true);
            const res = await axios.put(`http://localhost:5000/stockIn/update/${_id}`, { Product_Id, Date, Quantity, Unit_price });
            setMessage(res.data.message);
            setLoading(false);
            setTimeout(() => {
                navigate('/stockIn/list');
            }, 2000);
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

                    <h1 className="text-center text-gray-700 font-bold text-lg">Update Stock In</h1>
                <div className="mt-2">
                    <label htmlFor="" className="text-gray-800 text-lg block">Products</label>
                    <select 
                       className="w-full bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                       onChange={(e) => setProduct_Id(e.target.value)}
                       value={Product_Id}
                    >
                      {products?.map((prod, index) => (
                        <option key={index} value={prod._id}>{prod.Product_Name}</option>
                      ))}
                    </select> 
                </div>
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Date</label>
                 <input type="date" 
                    value={Date}
                     placeholder="Enter Product Name" 
                     className="w-full px-3 bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setDate(e.target.value)} />
                </div>
                
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Qauntity</label>
                 <input type="number" 
                     value={Quantity}
                     placeholder="Product Quantity (Unit also will be required)" 
                     className="w-full px-3 bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setQuantity(e.target.value)} />
                </div>
                
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Date</label>
                 <input type="number" 
                     value={Unit_price}
                     placeholder="Enter Unit price" 
                     className="w-full px-3 bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                     onChange={(e) => setUnit_price(e.target.value)} />
                </div>

                <button onClick={handleUpdateStock} className="w-full flex justify-center items-center  mt-6 bg-sky-300 py-2 gap-3 text-white font-bold rounded-full hover:bg-sky-400 transition-colors"><FaEdit />Update</button>
            </div>
        </div>
    )
}

export default UpdateStockIn;