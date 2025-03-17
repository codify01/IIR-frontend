"use client";
import React from "react";
import ButtonOne from "../Button/Buttonone";

interface CardSevenProps {
    amount: any;
    balType: string;
    cta?: string;
    redirect: string;
}

const CardSeven: React.FC<CardSevenProps> = ({ balType, amount, cta, redirect }) => {
    return (
        <div className="w-full p-5 bal-card bal-card2 relative flex flex-col justify-between h-[150px] rounded-[20px] overflow-hidden z-[1] text-sec shadow-lg shadow-tet/30">
            <div className="space-y-2">
                <b className="whitespace-nowrap text-sm">{balType}</b>
                <h3 className="text-3xl font-semibold">{amount}</h3>
            </div>
            <div className="flex justify-end items-center">
                <ButtonOne title={cta} href={redirect} optStyle2="w-max -mb-3 rounded-full font-medium text-sm" />
            </div>
        </div>
    );
};

export default CardSeven;
