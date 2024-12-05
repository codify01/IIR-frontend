"use client";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import ButtonOne from "../Button/Buttonone";
import { CiCirclePlus } from "react-icons/ci";

interface CardTwoProps {
    thisState: boolean;
    amount: number; // Keep amount as a number
    balType: string;
    cta: string;
    action: () => void;
}

// Utility function to format numbers as currency
const formatAccountBalance = (amount: number) => {
    // Convert to string with commas for thousands and prepend "NGN"
    return `NGN ${amount?.toLocaleString("en-NG")}`;
};

const Cardtwo: React.FC<CardTwoProps> = ({ balType, amount, thisState, action, cta }) => {
    return (
        <div className="w-full mb-8 p-5 bal-card relative flex flex-col justify-between h-[200px] rounded-[20px] overflow-hidden z-[1] text-sec shadow-lg shadow-tet/30">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <small>{balType}</small>
                    <h3 className="text-2xl font-semibold">
                        {thisState ? formatAccountBalance(amount) : "******"}
                    </h3>
                </div>
                <div className="cursor-pointer" onClick={action}>
                    {thisState ? (
                        <i><FaEye className="size-5 text-tetClr" /></i>
                    ) : (
                        <i><FaEyeSlash className="size-5 text-tetClr" /></i>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <ButtonOne title={cta} href="/user/withdraw" optStyle2="w-max px-4 bg-pry rounded-full font-medium" />
                <ButtonOne title={<CiCirclePlus className="size-6 text-tetClr" />} href="/user/deposit" optStyle2="w-max px-4 bg-pry rounded-full font-medium" />
            </div>
        </div>
    );
};

export default Cardtwo;
