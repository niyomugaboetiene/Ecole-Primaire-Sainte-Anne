import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaHome,FaChartBar, FaBox, FaArrowDown, FaArrowUp, FaTelegram } from "react-icons/fa";

import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="bg-stone-900 fixed bottom-0 left-0 right-0 h-70">
            <div className="flex justify-between">
               <div className="bg-linear-to-l from-white to-sky-800 bg-clip-text text-transparent">
                    <p className="mt-3 text-clip text-transparent font-bold  text-3xl  transition duration-200">Saint Anne</p>
                    <p className="text-white mt-3 font-bold">Saint App is app that help to manage products in the kitchen.</p>
                </div>
                 <div className="mt-4">
                    <h1 className="text-xl text-white font-bold border-s-3 me-2 border-green-500">Qick Links</h1>
                   <nav className="mt-4 space-y-4">
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold"><FaHome className="mt-1"/>Home</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/products/list'}><FaBox className="mt-1" />Products</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/stockIn/list'}><FaArrowDown  className="mt-1"/>Stock In</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/stockOut/list'}><FaArrowUp className="mt-1"/>Stock Out</Link>
                      <Link className="flex gap-2 hover:text-gray-800 hover:font-bold transition duration-300 text-white font-bold" to={'/report'}><FaChartBar className="mt-1"/>Report</Link>
                </nav>
               </div>

               <div className="mt-4">
                 <h1 className="text-xl text-white font-bold border-s-3 me-2 border-purple-500">Contact</h1>
                 <p className="font-bold text-white mt-3">+250 728 184 299</p>
                 <p className="font-bold text-white mt-3">niyomugaboetiene53@gmail.com</p>
               </div>

               <div className="mt-4 me-5 p-3">
                <h1  className="text-xl text-white font-bold border-s-3 me-2 border-blue-500">Social</h1>
                <div className="grid text-white grid-cols-2 mt-3 space-x-4 space-y-5">
                <p className="bg-blue-500 flex justify-center items-center p-3 rounded-lg hover:scale-110 hover:translate-y-3 transition duration-200" title="Facebook"><FaFacebook /></p>
                <p className="bg-purple-500 flex justify-center items-center p-3 rounded-lg hover:scale-110 hover:translate-y-3 transition duration-200" title="Instagram"><FaInstagram /></p>
                <p className="bg-red-500 flex justify-center items-center p-3 rounded-lg hover:scale-110 hover:translate-y-3 transition duration-200" title="Youtube"><FaYoutube /></p>
                <p className="bg-sky-500 flex justify-center items-center p-3 rounded-lg h-10 w-10 hover:scale-110 hover:translate-y-3 transition duration-200" title="Telegram"><FaTelegram /> </p>
                </div>
               </div>
            </div>
            <hr className="text-gray-500 -mt-0 "/>
            <div className="mt-2">
                <p className="text-white text-center -mt-1 font-bold">&copy; 2026. All right reserved</p>
            </div>
        </div>
    )
}

export default Footer;