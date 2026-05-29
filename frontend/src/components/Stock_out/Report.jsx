import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {  FaEye } from "react-icons/fa";

const Report = () => {
    const [report, setReport] = useState(null);

    const [stockOuts, setStockOut] = useState(null);

    const [totals, setTotals] = useState(null);
    

    const handleGetReportOfStockIn = async () => {
       try {
           const res = await axios.get('http://localhost:5000/stockOut/report/stockIn')

        //    console.log(res.data.summary);
           setReport(res.data.summary);
       } catch (err) {
        console.error(err);
       }
    }

    useEffect(() => {
        handleGetReportOfStockIn();
    }, []);
    
    const handleGetReportOfStockOut = async () => {
       try {
           const res = await axios.get('http://localhost:5000/stockOut/report/stockOut')

           console.log("Stock out", res.data.summary);
           setStockOut(res.data.summary);
       } catch (err) {
        console.error(err);
       }
    }

    useEffect(() => {
        handleGetReportOfStockOut();
    }, []);

    return (
        <div className="bg-sky-100 min-h-screen w-full">
            <div className="">
                {/* stockIn, stockOut, totalStockIn, totalStockOut, remainingStock */}
                <h1 className="text-xl font-bold text-center text-sky-500 mb-2">Reports</h1>
                <div className="max-w-7xl mx-auto w-full">
                 <h1 className="text-xl font-bold    text-sky-500 mb-2">Stock In report</h1>
                  <table border={2} className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Product Name</th>
                            <th className="py-2 px-3 text-left">Date</th>
                            <th className="py-2 px-3 text-left">Quantity</th>
                            <th className="py-2 px-3 text-left">Unit_price</th>
                            <th className="py-2 px-3 text-left">Total_price</th>
                            <th className="py-2 px-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {report?.stockIn?.map((item, index) => (
                            <tr  className={'bg-sky-200 hover:bg-sky-300 transition-colors'} key={index}>
                                <td className="py-3 px-3 text-left ">{item.Product_Id.Product_Name}</td>
                                <td className="py-3 px-3 text-left">{new Date(item.Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3 text-left ">{item.Quantity}</td>
                                <td className="py-3 px-3 text-left ">{item.Unit_price}</td>
                                <td className="py-3 px-3 text-left">{item.Total_price}</td>

                                <td className="flex justify-between">
                                    <Link to={`/stockIn/view/${item?.Product_Id._id}`} className="inline-flex bg-green-300 gap-2 rounded-lg hover:bg-green-400  transition-colors text-white py-2 px-4 mt-2" title="View Details"><FaEye className="mt-1" /> View</Link>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                </div>

               <div className="max-w-7xl mx-auto w-full mt-10">
                 <h1 className="text-xl font-bold    text-sky-500 mb-2">Stock Out report</h1>
                  <table border={2} className="w-full">
                    <thead className="bg-sky-300 text-gray-700">
                        <tr>
                            <th className="py-2 px-3 text-left">Product Name</th>
                            <th className="py-2 px-3 text-left">Date</th>
                            <th className="py-2 px-3 text-left">Quantity</th>
                            <th className="py-2 px-3 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stockOuts?.map((item, index) => (
                            <tr  className={'bg-sky-200 hover:bg-sky-300 transition-colors'} key={index}>
                                <td className="py-3 px-3 text-left ">{item.Product_Id.Product_Name}</td>
                                <td className="py-3 px-3 text-left">{new Date(item.Date).toLocaleDateString()}</td>
                                <td className="py-3 px-3 text-left ">{item.Quantity}</td>

                                <td className="flex justify-between">
                                    <Link to={`/stockIn/view/${item?.Product_Id._id}`} className="inline-flex bg-green-300 gap-2 rounded-lg hover:bg-green-400  transition-colors text-white py-2 px-4 mt-2" title="View Details"><FaEye className="mt-1" /> View</Link>
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

export default Report;