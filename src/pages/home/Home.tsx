import React, { useEffect, useState } from "react";
import ButtonOne from "../../components/Button/Buttonone";
import MobileHome from "../../layout/MobileHome";
import img1 from "../../assets/image/img1.png"
import { NavLink } from "react-router-dom";
import WhyUs from "./Whysection";
import HowItWorks from "./Howsection";
import Testimonial from "./Testimonialsection";
import Footer from "./Footer";
import FAQ from "./Faqsection";
import FaqSection from "./Faqsection";


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

  return (
    <div>
      {isMobile ? (
        <MobileHome />
      ) : (
        <>
          {/* herosection */}
          <section className="herosection relative z-[1] flex flex-col justify-center items-center">

            <div className="overlay w-full h-full bg-tet/50 absolute -z-[1]"></div>

            <nav className="container absolute top-0 py-3 w-full flex justify-between text-sec items-center">
                <div className="w-[80px]">
                    <img src={img1} alt="..." className="w-full" />
                </div>
                <ul className="flex items-center font-medium gap-8 mt-1">
                    <li>
                        <NavLink className={"navlink relative"} to={"#services"}>Our Services</NavLink>
                    </li>
                    <li>
                        <NavLink className={"navlink relative"} to={"#how"}>How it works</NavLink>
                    </li>
                    <li>
                        <NavLink className={"navlink relative"} to={"#testimonial"}>Testimonials</NavLink>
                    </li>
                    <li>
                        <NavLink className={"navlink relative"} to={"#contact"}>Contact</NavLink>
                    </li>
                </ul>
                <div className="flex items-center gap-3">
                    <ButtonOne title={"Register"} optStyle={"w-[100px] font-normal text-sec/70 bg-transparent"} href={"/register"} />
                    <ButtonOne title={"Login"} optStyle={"w-[100px] text-sec"} href={"/login"} />
                </div>
            </nav>

            <div className="container text-center leading-loose space-y-2 text-sec">
                <h3 className="text-4xl lg:w-3/4 w-full mx-auto font-bold">Grow Your Wealth with Smart Investment Plans</h3>
                <p>Start investing with little and watch your wealth grow.</p>
                <NavLink to={"/register"}>
                    <button className={"bg-sec shadow-md shadow-tet/50 lg:w-1/4 w-1/3 p-3 mt-5 text-tet font-bold rounded-lg"}>Get Started</button>
                </NavLink>
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
