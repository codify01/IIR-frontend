import React from "react";
import img1 from "../assets/media/img1.png";
import { MdShoppingCart } from "react-icons/md";

const Navbar: React.FC = () => {
    
    return(

        <nav className="lg:flex border bg-black">
            <div className="container flex items-center justify-between">
                <a className="navbar-brand border border-tetClr" href="#">
                    <img src={img1} alt="..." className="img-fluid w-3/4" />
                </a>
                <div className="flex items-center gap-5">
                    <ul className="flex items-center gap-2">
                        <li className="list-none">
                            <a className="text-secClr underline-none" href="#">Home</a>
                        </li>
                        <li className="list-none">
                            <a className="text-secClr underline-none" href="#">Product</a>
                        </li>
                        <li className="list-none">
                            <a className="text-secClr underline-none" href="#">Contact Us</a>
                        </li>
                        <li className="list-none">
                            <a className="text-secClr underline-none" href="#">About Us</a>
                        </li>
                    </ul>
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn bg-gray-400 ">
                            <MdShoppingCart className="text-xl" />
                        </button>
                        <button className="btn btn-dark">Login</button>
                    </div>
                </div>
            </div>
        </nav>
    
    )

}

export default Navbar