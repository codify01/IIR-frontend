import React from "react";

interface CardOneProps {
    title?: string;
    picture?: string;
    description?: string;
    cta?: string;
    imgOptStyle?: string;
}

const CardOne: React.FC<CardOneProps> = ({ title, picture, description, cta, imgOptStyle }) => {

    return (

        <div className="card w-[100%] flex flex-col gap-5">
            <div className="img w-full">
                <img src={picture} alt="" className={`mx-auto h-[250px] object-contain ${imgOptStyle}`} />
            </div>
            <div className="text flex flex-col w-full gap-5 text-center">
                <h3 className="text-base font-semibold">{title}</h3>
                <div>
                    <p>{description}</p>
                    <p>{cta}</p>
                </div>
            </div>
        </div>

    )

}

export default CardOne