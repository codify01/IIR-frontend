// import React from "react";
import img2 from "../../assets/image/img2.jpeg"
import img1 from "../../assets/image/img1.png"
import { NavLink } from "react-router-dom";

const Notfound = () => {

    return (

        <div className="h-[100vh] bg-[#e3f9ed]/20 relative">
            <div className="container h-full px-5">
                <div className="nav py-3 flex items-end">
                    <div className="max-w-16">
                        <img src={img1} alt="Logo" />
                    </div>
                    <h3 className="">Pineleafestates</h3>
                </div>
                <div className="flex items-center h-3/4 lg:flex-row flex-col-reverse md:justify-center">
                    <div className="text lg:mt-0 md:mt-10 lg:text-start text-center">
                        <h3 className="text-7xl font-bold mb-6">Oops!</h3>
                        <p className="mx-auto">The page you are looking for was moved, renamed, removed or might never existed.</p>
                        <div className="flex gap-5 mt-3 items-center lg:justify-start justify-center">
                            <NavLink to={"/"} className={"flex items-center justify-center h-[45px] bg-green-800 md:w-[40%] w-1/2 my-3 rounded-md shadow-lg text-white"}>Take me Home</NavLink>
                            <a href="mailto:pineleafestates@gmail.org" className="my-3 rounded-md text-black">Contact Us</a>
                        </div>
                    </div>
                    <div className="img w-[100%] md:translate-x-[10%]">
                        <img src={img2} alt="..." />
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Notfound