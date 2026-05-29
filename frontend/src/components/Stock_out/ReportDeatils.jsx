import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus} from "react-icons/fa"

const ReportDeatils = () => {
    const { Product_Id } = useParams();
    const [details, setDeatils] = useState(null);

    const handleGeDeails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/stockOut/report/product/${Product_Id}`);
            
            // console.log("Received Id", Product_Id);
            console.log("Result", res.data.summary);

            setDeatils(res.data.summary);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        handleGeDeails();
    }, [Product_Id]);

    return (
        <div className="bg-sky-100 min-h-screen flex justify-center items-center">
            <div className="w-125 h-125 bg-white rounded-lg shadow-lg">
                <div className="bg-linear-to-br p-2 rounded-lg from-sky-400 to-sky-600 via-sky-300">
                   <h1 className="text-sky-700 text-xl font-bold mb-3">Product Deatils</h1>
                   <h1 className="text-md text-sky-700 font-bold">{details?.stockIn[0].Product_Id?.Product_Name}</h1>
                </div>
                <div className="bg-linear-to-b from-sky-200 to-sky-300 w-full h-full p-3">
                   <p className="text-sm font-bold text-gray-700  mt-3 mb-2">Product Id</p>
                   <p className="bg-sky-300 p-2 py-3 rounded-full">{details?.stockIn[0].Product_Id?.Product_Id}</p>
                   <p className="text-sm font-bold text-gray-700 mt-3 mb-2">Stock In</p>
                   <p className="bg-sky-300 p-2 py-3 rounded-full">{details?.totalStockIN}</p>
                   <p className="text-sm font-bold text-gray-700 mt-3 mb-2">Stock Out</p>
                   <p className="bg-sky-300 p-2 py-3 rounded-full">{details?.totalStockOut}</p>
                   <p className="text-sm font-bold text-gray-700 mt-3 mb-2">Remaining Stock</p>
                   <p className="bg-sky-300 p-2 py-3 rounded-full">{details?.remainingStock}</p>

                   <div className="flex justify-between mt-5 ">
                    <button className="w-55 bg-linear-to-br text-white font-bold rounded-lg  py-2 from-red-600 hover:scale-105 transition duration-300 to-red-400 flex items-center justify-center gap-2"><FaArrowLeft />Back</button>
                    <button  className="w-55 bg-linear-to-br text-white font-bold rounded-lg  py-2 from-green-600 hover:scale-105 transition duration-300 to-green-400 flex items-center justify-center gap-2 h-12"><FaPlus />Find New</button>
                   </div>
                 </div>
            </div>
        </div>
    )
}

export default ReportDeatils;