import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaHome,FaChartBar, FaBox, FaArrowDown, FaArrowUp, FaSignInAlt, FaUserPlus } from "react-icons/fa";

import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="bg-stone-900">
            <div>
               <div className="bg-linear-to-l from-white to-sky-800 bg-clip-text text-transparent">
                    <p className="mt-3 text-clip text-transparent font-bold  text-3xl  transition duration-200">Saint Anne</p>
                </div>
                 <div >
                   <nav className="flex space-x-4 mt-4">
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold"><FaHome className="mt-1"/>Home</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/products/list'}><FaBox className="mt-1" />Products</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/stockIn/list'}><FaArrowDown  className="mt-1"/>Stock In</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/stockOut/list'}><FaArrowUp className="mt-1"/>Stock Out</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/report'}><FaChartBar className="mt-1"/>Report</Link>
                </nav>
               </div>

               <div>
                 <h1>Contact</h1>
                 <p>+250 728 184 299</p>
               </div>

               <div>
                <h1>Social</h1>
                <div>
                <FaFacebook />
                <FaInstagram />
                <FaYoutube />
                </div>
               </div>
            </div>
        </div>
    )
}

export default Footer;