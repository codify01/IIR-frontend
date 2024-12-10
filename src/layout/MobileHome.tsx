import React, { useEffect } from "react";
import img1 from "../assets/image/img1.png"
import { useNavigate } from "react-router-dom";

const MobileHome: React.FC = () => {

    const navigate = useNavigate()

    useEffect(() => {
        setInterval(() => {
            navigate('/login');
        }, 5000);
    })

    return (

        <div className="h-screen bg-pry/10 relative overflow-hidden flex flex-col items-center justify-center border w-full">
            <div className="w-1/2">
                <img src={img1} alt="..." className="w-full" />
            </div>
            <p className="font-bold text-xl">...Land Banking is a Must!</p>
            <div className="spinner">
                <div className="w-16 h-16 mt-5 border-[10px] border-t-pry border-pry/20 rounded-full animate-spin"></div>
            </div>
        </div>

    )

}

export default MobileHome