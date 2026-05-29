import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {  FaEye } from "react-icons/fa";

const Report = () => {
    const [report, setReport] = useState(null);
    

    const handleGetReport = async () => {
       try {
           const res = await axios.get('http://localhost:5000/stockOut/report')

           setReport(res.data.summary);
       } catch (err) {
        console.error(err);
       }
    }

    useEffect(() => {
        handleGetReport();
    }, []);

    return (
        <div className="bg-sky-100 min-h-screen w-full">
            <div className="">
                {/* stockIn, stockOut, totalStockIn, totalStockOut, remainingStock */}
                <h1 className="text-xl font-bold text-center text-sky-500 mb-2">Reports</h1>
                <div className="max-w-7xl mx-auto w-full">
                  <table border={2} className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Product Name</th>
                            <th className="py-2 px-3 text-left">Date</th>
                            <th className="py-2 px-3 text-left">Quantity</th>
                            <th className="py-2 px-3 text-left">Stock In</th>
                            <th className="py-2 px-3 text-left">Stock Out</th>
                            <th className="py-2 px-3 text-left">Remainig Stock</th>
                        </tr>
                    </thead>

                    <tbody>
                            <tr  className={'bg-sky-200 hover:bg-sky-300 transition-colors'}>
                                <td className="py-3 px-3 text-left ">{report?.stockIn?.Product_Id?.Product_Name}</td>
                                <td className="py-3 px-3 text-left">{new Date(report?.stockIn?.Product_Id?.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-3 text-left ">{report?.Quantity}</td>
                                <td className="py-3 px-3 text-left ">{report?.totalStockIn}</td>
                                <td className="py-3 px-3 text-left ">{report?.remainingStock}</td>

                                <td className="flex justify-between">
                                    <Link to={`/stockIn/update/${report?._id}`} className="inline-flex bg-green-300 gap-2 rounded-lg hover:bg-green-400  transition-colors text-white py-2 px-4 mt-2"><FaEye className="mt-1" /> View</Link>
                                </td>
                            </tr>
                        
                    </tbody>
                </table>
                </div>
               
            </div>
        </div>
    )
}

export default Report;