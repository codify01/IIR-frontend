import React from "react";

interface FaqaccordionsProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}
const Faqaccordions: React.FC<FaqaccordionsProps> = ({question, answer, isOpen, onClick }) => {

    return(

        <div className="flex flex-col space-y-1 font-medium text-md cursor-pointer bg-sec rounded-lg p-3">
            <div className="accordion-head p-5 bg-sec rounded-[inherit] shadow-lg font-semibold shadow-tet/20 flex justify-between items-center transition-all" onClick={onClick}>
                <p>{question}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`duration-300 transition-all ${isOpen?"size-6 rotate-45":"size-6"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>
            <div className={isOpen ? `accordion-body p-5` : `hidden`}>
                <p className="leading-relaxed">{answer}</p>
            </div>
        </div>

    )

}

export default Faqaccordions;