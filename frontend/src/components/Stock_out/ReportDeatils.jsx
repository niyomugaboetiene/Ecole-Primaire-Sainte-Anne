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
}