import { useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";


const UpdateProduct = () => {
    const [Product_Id, setProduct_Id] = useState(0);
    const [Product_Name, setProduct_Name] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(true);

    const { _id } = useParams();

    const handleGetExistingProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/products/single/${_id}`, { withCredentials: true });
            const product = res.data.list;

            setProduct_Id(product.Product_Id);
            setProduct_Name(product.Product_Name);
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "Error occured";
            if (errorMessage === "Login first.") {
               setIsAuthorized(false);
           }
        }
    }

    useEffect(() => {
        handleGetExistingProduct();
    }, [_id]);

    const handleUpdateProduct = async () => {
        try {
            setIsLoading(true);
            const res = await axios.put(`http://localhost:5000/products/update/${_id}`, { Product_Id, Product_Name }, { withCredentials: true });
            setMessage(res.data.message);
            setError("");
            setTimeout(() => {
              navigate('/products/list');
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error occured";
            console.error(err);
            setError(errorMessage);
            setMessage("");
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
        <div className="bg-sky-200 min-h-screen flex justify-center items-center">
            <div className="bg-white p-2 h-fit w-90 rounded-lg shadow-lg">
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

                    <h1 className="text-center text-gray-700 font-bold text-lg">Update Products</h1>
                <div className="mt-2">
                    <label htmlFor="" className="text-gray-800 text-lg block">Product Id</label>
                    <input type="text" 
                       value={Product_Id} disabled
                       className="w-full bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                       placeholder="Enter Product Id (unique)"
                        onChange={(e) => setProduct_Id(e.target.value)} />
                </div>
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Product Name</label>
                 <input type="text" 
                    value={Product_Name}
                    placeholder="Enter Product Name" 
                    className="w-full bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                    onChange={(e) => setProduct_Name(e.target.value)} />
                </div>

                <button onClick={handleUpdateProduct} className="w-full flex justify-center items-center  mt-6 bg-sky-300 py-2 gap-3 text-white font-bold rounded-full hover:bg-sky-400 transition-colors"><FaEdit />Update</button>
            </div>
        </div>
    )
}

export default UpdateProduct;