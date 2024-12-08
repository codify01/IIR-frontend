import React, { useEffect, useState } from "react";
import ButtonOne from "../../components/Button/Buttonone";
import MobileHome from "../../layout/MobileHome";
import img1 from "../../assets/image/img1.png"
import { Link } from "react-router-dom";
import WhyUs from "./Whysection";
import HowItWorks from "./Howsection";
import Testimonial from "./Testimonialsection";
import FaqSection from "./Faqsection";
import Footer from "./Footer";
import { FaBarsStaggered, FaX } from "react-icons/fa6";


const useMobileScreen = (): boolean => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Home: React.FC = () => {

  const isMobile = useMobileScreen();
  const [openNav, setOpenNav] = useState<boolean>(false)

  return (
    <div>
      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          {/* herosection */}
          <section className="herosection relative z-[1] flex flex-col justify-center items-center">

            <div className="overlay w-full h-full bg-tet/50 absolute -z-[1]"></div>

            <nav className="container absolute top-0 py-3 w-full lg:flex hidden justify-between text-sec items-center">
                <div className="w-[80px]">
                    <img src={img1} alt="..." className="w-full" />
                </div>
                <ul className="flex items-center font-medium gap-8 mt-1">
                    <li>
                        <Link className={"navlink relative"} to={"#services"}>Our Services</Link>
                    </li>
                    <li>
                        <Link className={"navlink relative"} to={"#how"}>How it works</Link>
                    </li>
                    <li>
                        <Link className={"navlink relative"} to={"#testimonial"}>Testimonials</Link>
                    </li>
                    <li>
                        <Link className={"navlink relative"} to={"#faq"}>Faq</Link>
                    </li>
                </ul>
                <div className="flex items-center gap-3">
                    {/* <ButtonOne title={"Register"} optStyle={"w-[100px] font-normal text-sec/70 bg-transparent"} href={"/register"} /> */}
                    <ButtonOne title={"My Dashboard"} optStyle={"w-full p-3 bg-sec text-tet shadow-md shadow-tet/20 font-light text-sm"} href={"/login"} />
                </div>
            </nav>

            <nav className="container absolute top-0 py-3 w-full lg:hidden flex justify-between text-sec items-center">
                <ul className={`${openNav ? "flex absolute top-24 py-10 shadow-lg shadow-tet/20 rounded-b-2xl left-0 w-full flex-col text-pry bg-sec opacity-100" : "hidden opacity-0"} items-center font-medium gap-8 mt-1 duration-[5s] transition-opacity`}>
                    <li>
                        <Link className={"navlink relative"} to={"#services"}>Our Services</Link>
                    </li>
                    <li>
                        <Link className={"navlink relative"} to={"#how"}>How it works</Link>
                    </li>
                    <li>
                        <Link className={"navlink relative"} to={"#testimonial"}>Testimonials</Link>
                    </li>
                    <li>
                        <Link className={"navlink relative"} to={"#faq"}>Faq</Link>
                    </li>
                </ul>
                <i className={`${openNav ? "hidden" : "block"}`} onClick={() => setOpenNav(true)}>
                  <FaBarsStaggered className="size-5"/>
                </i>
                <i className={`${openNav ? "block" : "hidden"}`} onClick={() => setOpenNav(false)}>
                  <FaX className="size-5"/>
                </i>
                <div className="w-[80px]">
                    <img src={img1} alt="..." className="w-full" />
                </div>
                <div className="flex items-center gap-3">
                    {/* <ButtonOne title={"Register"} optStyle={"w-[100px] font-normal text-sec/70 bg-transparent"} href={"/register"} /> */}
                    <ButtonOne title={"My Dashboard"} optStyle={"w-full p-3 bg-sec text-tet shadow-md shadow-tet/20 font-light text-sm"} href={"/login"} />
                </div>
            </nav>

            <div className="container text-center leading-loose space-y-2 text-sec">
                <h3 className="text-4xl lg:w-3/4 w-full mx-auto font-bold">Grow Your Wealth with Smart Investment Plans</h3>
                <p>Start investing with little and watch your wealth grow.</p>
                <Link to={"/register"}>
                    <button className={"bg-sec shadow-md shadow-tet/50 lg:w-1/4 w-1/3 p-3 mt-5 text-tet font-bold rounded-lg"}>Get Started</button>
                </Link>
            </div>

          </section>
          {/* why choose us */}
          <WhyUs/>
          {/* How It works */}
          <HowItWorks/>
          {/* Testimonial */}
          <Testimonial/>
          {/* FaqSection */}
          <FaqSection/>
          {/* Footer */}
          <Footer/>
        </>
      )}
    </div>
  );
};

export default Home;
