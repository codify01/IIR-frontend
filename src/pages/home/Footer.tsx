import React from "react";
import img1 from "../../assets/image/img1.png"
import { NavLink } from "react-router-dom";
import { FaArrowCircleRight, FaArrowRight, FaCopyright, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";
import { MdArrowForward } from "react-icons/md";

const Footer: React.FC = () => {

    return (

        <section className="bg-pry text-sec py-10 mt-10" id="footer">
            <div className="container grid grid-cols-4 lg:gap-5 gap-10">
                <div className="lg:col-span-1 col-span-2">
                    <div className="w-[80px]">
                        <img src={img1} alt="..." className="w-full" />
                    </div>
                    <h3>...land Banking is a must</h3>
                </div>
                <div className="lg:col-span-1 col-span-2">
                    <div className="lg:ms-0 md:ms-auto w-max">
                        <h3 className="text-xl mb-3 font-bold">Quick Links</h3>
                        <ul className="flex text-center text-sm flex-col lg:items-start items-end font-medium gap-4 mt-1">
                            <li className="w-max flex items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                <MdArrowForward/>
                                <NavLink to={"#services"}>Our Services</NavLink>
                            </li>
                            <li className="w-max flex items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                <MdArrowForward/>
                                <NavLink to={"#how"}>How it works</NavLink>
                            </li>
                            <li className="w-max flex items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                <MdArrowForward/>
                                <NavLink to={"#testimonial"}>Testimonials</NavLink>
                            </li>
                            <li className="w-max flex items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                <MdArrowForward/>
                                <NavLink to={"#contact"}>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-1 col-span-2 text-center">
                    <h3 className="text-xl mb-3 font-bold">Newsletter</h3>
                    <div className="text-sm space-y-2">
                        <p>Subscribe to our newsletter to keep updated</p>
                        <form>
                            <input type="email" placeholder="Enter your email" className="w-full h-11 indent-3 text-sm shadow-md shadow-tet/30 border-2 border-sec/30 outline-0 text-sec rounded-md bg-sec/30 placeholder:text-pry" />
                            <button className={"bg-sec shadow-md shadow-tet/30 h-11 w-1/2 px-3 mt-3 text-tet rounded-lg"}>Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-1 col-span-2">
                    <h3 className="text-xl mb-3 font-bold text-end">Socials</h3>
                    <ul className="flex flex-col items-end font-medium text-sm gap-4 mt-1">
                            <NavLink 
                                to={"https://facebook.com"}
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                <li className="w-max flex flex-row-reverse items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                    <FaFacebook/>
                                    <span>Facebook</span>
                                </li>
                            </NavLink>
                            <NavLink 
                                to={"https://twitter.com"}
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                <li className="w-max flex flex-row-reverse items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                    <FaXTwitter/>
                                    <span>Twitter</span>
                                </li>
                            </NavLink>
                            <NavLink 
                                to={"https://whatsapp.com"}
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                <li className="w-max flex flex-row-reverse items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                    <FaWhatsapp/>
                                    <span>Whatsapp</span>
                                </li>
                            </NavLink>
                            <NavLink 
                                to={"https://instagram.com"}
                                target="_blank" 
                                rel="noopener noreferrer" 
                            >
                                <li className="w-max flex flex-row-reverse items-center gap-2 hover:gap-1 duration-300 transition-all navlink relative">
                                    <FaInstagram/>
                                    <span>Instagram</span>
                                </li>
                            </NavLink>
                    </ul>
                </div>
                <div className="col-span-4 lg:my-5">
                    <hr className="border-2 rounded-full border-sec/60"/>
                </div>
                <div className="col-span-4 lg:-mt-0 -mt-3">
                    <div className="flex text-sec/60 justify-between items-end">
                        <small className="flex items-center space-x-1">
                            <span>copyright</span> 
                            <FaCopyright/> 
                            <span>2024</span> 
                            <NavLink 
                                className={"text-sec navlink relative"}
                                to={"https://pineleafestates.com"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Pineleaf Estates
                            </NavLink>
                        </small>
                        <h3>
                            <span>Built by </span> 
                            <NavLink 
                                className={"text-sec navlink relative"}
                                to={"https://sunmence.com.ng"} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Sunmence
                            </NavLink>
                        </h3>
                    </div>
                </div>
            </div>
        </section>

    )

}

export default Footer;