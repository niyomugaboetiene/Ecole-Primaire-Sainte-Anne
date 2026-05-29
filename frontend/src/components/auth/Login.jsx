import { useState } from "react";
import axios from "axios";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!UserName || !Password) {
                setMessage("Fill out all missing fields");
            }
            
            setIsLoading(true);
            const res = await axios.post('http://localhost:5000/auth/login', { UserName, Password }, { withCredentials: true });
            setMessage(res.data.message);
            setError("");
            setTimeout(() => {
                navigate('/report');
            }, 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error occured";
            console.error(err);
            setError(errorMessage);
            setMessage("");
        }
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

                    <h1 className="text-center text-gray-700 font-bold text-lg">Login</h1>
                <div className="mt-2">
                    <label htmlFor="" className="text-gray-800 text-lg block">User Name</label>
                    <input type="text" 
                    className="w-full bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                    placeholder="Enter User Name"
                     onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mt-2">
                 <label htmlFor="" className="text-gray-800 text-lg block">Password</label>
                 <input type="password" 
                 placeholder="Enter Password" 
                 className="w-full bg-sky-100 py-2 p-1 rounded-full mt-1 focus:outline-1 focus:outline-sky-300"
                 onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button onClick={handleLogin} className="w-full flex justify-center items-center  mt-6 bg-sky-300 py-2 gap-3 text-white font-bold rounded-full hover:bg-sky-400 transition-colors"><FaSignInAlt />Login</button>
            </div>
        </div>
    )
}

export default Login