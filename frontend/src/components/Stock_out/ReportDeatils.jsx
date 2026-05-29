import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
                <div className="bg-linear-to-b from-sky-200 to-sky-300 w-full h-full p-3 rounded-lg">
                   <p className="text-sm font-bold text-gray-700">Product Id</p>
                   <p className="bg-sky-300 p-2 py-3 rounded-full">{details?.stockIn[0].Product_Id?.Product_Id}</p>
                   <p className="text-sm font-bold text-gray-700">Stock In</p>
                   <p className="bg-sky-300 p-2 py-3 rounded-full">{details?.totalStockIN}</p>
                   <p className="text-sm font-bold text-gray-700">Stock Out</p>
                   <p className="bg-sky-300 p-2 py-3 rounded-full">{details?.totalStockOut}</p>
                  <p>Remaining Stock{details?.remainingStock}</p>
                 </div>
            </div>
        </div>
    )
}

export default ReportDeatils;