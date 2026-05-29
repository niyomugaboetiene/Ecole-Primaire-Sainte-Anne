import { FaHome, FaInfoCircle, FaBox, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="bg-sky-400 p-5 h-25">
            <div className="flex justify-between">
                <div>
                    Logo
                </div>
               <div >
                   <nav className="flex">
                      <Link><FaHome />Home</Link>
                      <Link><FaBox />Products</Link>
                      <Link><FaArrowDown />Stock In</Link>
                      <Link><FaArrowUp />Stock Out</Link>
                      <Link><FaInfoCircle />About Us</Link>
                </nav>
               </div>
               <div>
                   Admin Data
               </div>
            </div>
        </div>
    )
} 

export default NavBar;