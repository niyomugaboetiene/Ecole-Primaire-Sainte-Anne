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
        <div>
            <div>
                <h1>Product Deatils</h1>
                <div>
                   <h1>{details?.stockIn[0].Product_Id?.Product_Name}</h1>
                   <p>Product Id{details?.stockIn[0].Product_Id?.Product_Id}</p>
                   <p>Stock In{details?.totalStockIN}</p>
                   <p>Stock Out{details?.totalStockOut}</p>
                  <p>Remaining Stock{details?.remainingStock}</p>
                 </div>
            </div>
        </div>
    )
}

export default ReportDeatils;