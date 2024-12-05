import React from "react";
import img1 from "../../assets/image/img1.png"
import { NavLink } from "react-router-dom";

interface NavOneProps {
    optStyle?: string;
}

const Navone: React.FC<NavOneProps> = ({ optStyle }) => {

    return (

        <NavLink to={"/"} className={`nav py-3 flex items-end ${optStyle}`}>
            <img src={img1} alt="..." />
            <h3 className="font-semibold text-[#2F5318]">Pineleafestates</h3>
        </NavLink>

    )

}

export default Navone