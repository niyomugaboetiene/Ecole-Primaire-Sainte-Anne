import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ReportDeatils = () => {
    const { Product_Id } = useParams();
    const [details, setDeatils] = useState(null);

    const handleGeDeails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/stockOut/report/product/${Product_Id}`);
            console.log(res.data.summary);

            setDeatils(res.data.summmary);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        handleGeDeails();
    }, [Product_Id]);

    return (
        <div>
            <div>
                <h1>Product Deatils</h1>
                <div>
                     {details?.map((item, index) => (
                        <div key={index}>
                            <h1>{item?.stockIn[0].Product_Name}</h1>
                            <p>{item?.stockIn[0]._Product_Id}</p>
                            <p>{item.totalStockIN}</p>
                            <p>{item.totalStockOut}</p>
                            <p>{item.remainingStock}</p>
                        </div>
                     ))}
                </div>
            </div>
        </div>
    )
}

export default ReportDeatils;