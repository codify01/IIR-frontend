import React from "react";
import { NavLink } from "react-router-dom";

interface ButtonOneProps {
    title: string | React.ReactNode;
    href: string;
    optStyle?: string;
    optStyle2?: string;
}

const ButtonOne: React.FC<ButtonOneProps> = ({ title, href, optStyle, optStyle2 }) => {

    return (
        
        <>
            <NavLink to={href} className={`w-full text-center ${optStyle2}`}>
                <button className={`bg-pry/55 font-semibold h-[45px] rounded-lg ${optStyle}`}>{title}</button>
            </NavLink>
        </>

    )

}

export default ButtonOne