import { FaHome, FaInfoCircle, FaBox, FaArrowDown, FaArrowUp, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <>
          <div className="bg-sky-600">
                 <div className="p-1 flex justify-end gap-4">
                    <Link className="flex gap-2 justify-center items-center text-white font-bold hover:scale-105 transition duration-200"><FaSignInAlt /> Login</Link>
                    <Link className="flex gap-2 justify-center items-center text-white font-bold hover:scale-105 transition duration-200"><FaUserPlus />Register</Link>
                 </div>
          </div>
        <div className="bg-sky-400 p-5 h-25">
            <div className="flex justify-between">
                <div className="bg-linear-to-l from-white to-sky-800 bg-clip-text text-transparent">
                    <p className="mt-3 text-clip text-transparent font-bold  text-3xl  hover:scale-105 transition duration-200">Saint Anne</p>
                </div>
               <div >
                   <nav className="flex space-x-4 mt-4">
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold "><FaHome className="mt-1"/>Home</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold"><FaBox className="mt-1" />Products</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold"><FaArrowDown  className="mt-1"/>Stock In</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold"><FaArrowUp className="mt-1"/>Stock Out</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold"><FaInfoCircle className="mt-1"/>About Us</Link>
                </nav>
               </div>
               <div>
                   Admin Data
               </div>
            </div>
        </div>
         </>

    )
} 

export default NavBar;