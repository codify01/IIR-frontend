import React from "react";
import img1 from "../../assets/image/img1.png"
import { NavLink } from "react-router-dom";

interface NavOneProps {
    optStyle?: string;
}

const Navone: React.FC<NavOneProps> = ({ optStyle }) => {

    return (

        <NavLink to={"/"} className={optStyle}>
            <div className="w-[80px]">
                <img src={img1} alt="..." className="w-full" />
            </div>
        </NavLink>

    )

}

export default Navone