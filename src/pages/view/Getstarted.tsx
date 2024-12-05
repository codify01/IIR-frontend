// import React from "react";
import CarouselTwo from "../../components/carousel/Carouseltwo";
import ButtonOne from "../../components/Button/Buttonone";

const GetStarted = () => {

    return (

        <div className="h-[100vh] pb-10 bg-[#e3f9ed]/20 relative">
            <div className="container h-full px-5 py-10 flex items-center text-sm flex-col md:justify-center justify-between">
                <div className="w-full">
                    <CarouselTwo />
                </div>
                <div className="flex md:flex-row justify-center md:mt-10 flex-col md:gap-10 gap-3 w-full">
                    <ButtonOne title={"Log In"} optStyle2={"text-end"} optStyle={"md:w-1/2 w-full text-white bg-[#2F5318]"} href={"/login"} />
                    <ButtonOne title={"Sign In"} optStyle2={"text-start"} optStyle={"md:w-1/2 w-full mx-auto"} href={"/register"} />
                </div>
            </div>
        </div>

    )

}

export default GetStarted