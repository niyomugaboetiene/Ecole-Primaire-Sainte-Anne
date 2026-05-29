import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ReportDeatils = () => {
    const { _Product_Id } = useParams();
    const [details, setDeatils] = useState(null);

    const handleGeDeails = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/stockOut/report/product/${_Product_Id}`);
            console.log(res.data.summmary);

            setDeatils(res.data.summmary);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        handleGeDeails();
    }, []);

    return (
        <div>
            <div>
                <h1>Product Deatils</h1>
                <div>
                     {details?.map((item, index) => (
                        <div key={index}>

                        </div>
                     ))}
                </div>
            </div>
        </div>
    )
}