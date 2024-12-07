import React from "react";
import Navone from "../components/nav/Navone";
import ButtonOne from "../components/Button/Buttonone";
import img7 from "../assets/image/img7.png"
import img8 from "../assets/image/img8.png"

const MobileHome: React.FC = () => {

    return (

        <div className="h-[93vh] relative overflow-hidden flex flex-col w-full">
            <Navone optStyle={"px-5 h-[10vh]"} />
            <div className="flex mt-auto h-[80vh] lg:flex-row flex-col justify-between">
                <div className="text hero-text md:h-[20vh] md:pt-5 h-[25vh] relative flex flex-col gap-3 px-5">
                    <h1 className="text-2xl md:w-3/5 w-[90%] font-semibold">Invest & Save Your Money With Small Risk</h1>
                    <p className="text-sm md:w-3/5 w-[90%] font-normal">A Tradition of Excellence, Integrity, Knowledge and Service for over 20 years.</p>
                </div>
                <div className="hero-image mt-auto md:h-[72vh] h-[65vh] overflow-hidden flex justify-center p-5 items-end z-[2] w-100 relative">
                    <img src={img7} alt="" className="w-full top-0 absolute object-cover -z-[2]" />
                    <img src={img8} alt="" className="absolute top-0 w-full object-cover -z-[1]" />
                    <ButtonOne title={"Get Started"} optStyle={"w-5/6 bg-sec mt-auto mb-10 text-black"} href={"/getstarted"} />
                </div>
            </div>
        </div>

    )

}

export default MobileHome