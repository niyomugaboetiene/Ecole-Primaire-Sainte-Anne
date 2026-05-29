import { FaHome, FaInfoCircle, FaBox, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="bg-sky-400">
            <div className="flex">
                <div>
                    Logo
                </div>
               <div>
                   <nav>
                      <Link><FaHome />Home</Link>
                      <Link><FaBox />Products</Link>
                      <Link><FaArrowDown />Stock In</Link>
                      <Link><FaArrowUp />Stock Out</Link>
                      <Link><FaInfoCircle />About Us</Link>
                </nav>
               </div>
               <div>
                   
               </div>
            </div>
        </div>
    )
} 

export default NavBar;