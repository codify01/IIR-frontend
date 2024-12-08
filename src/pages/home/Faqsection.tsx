import React, { useState } from "react";
import AccordButton from "../../components/Button/AccordButon.tsx"

const FaqSection: React.FC = () => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const FaqArray = [
        {
            heading: "What is investing in Pineleaf Estates, and how does it work?",
            body: "This Investment platform is a user-friendly investment platform that helps individuals grow their wealth by providing tailored investment solutions. Simply sign up, set your financial goals, and let us guide you through the investment process with real-time tracking and expert support."
        },
        {
            heading: "Is investing in Pineleaf Estates safe and secure for my investments?",
            body: "Absolutely. We prioritize your security by using advanced encryption, secure servers, and adhering to strict compliance standards. Your investments and personal data are always protected."
        },
        {
            heading: "How long does it take to create an account?",
            body: "Creating an account takes only a few minutes. Just provide basic details, verify your identity, and you’re ready to start investing."
        },
        {
            heading: "What types of investments can I make on this platform?",
            body: "Our platform provides diverse and tailored investment opportunities designed to align with your financial goals. Whether you're aiming for short-term returns or long-term growth, we've got you covered."
        },
        {
            heading: "What makes investing in Pineleaf Estates different from other investment platforms?",
            body: "Investing in Pineleaf Estates stands out because of its platform intuitive design, expert guidance, and focus on user success. Our platform offers low fees, real-time insights, and personalized investment strategies, making investing stress-free and effective."
        },
        {
            heading: "Do I need to have investment experience to start investing in Pineleaf Estates?",
            body: "Not at all! Investing in Pineleaf Estates is designed for everyone, from beginners to seasoned investors. We provide tools, educational resources, and expert insights to help you succeed regardless of your experience level."
        },
    ]

    const handleAccordionClick = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (

        <div className="container">
            <div className="text-center text-pry mb-12">
                <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                <p className="w-3/4 mx-auto">Everything you need to know about getting started with investing in Pineleaf Estates.</p>
            </div>
            <div className="bg-pry/10 space-y-4 p-5 rounded-xl">
                {
                    FaqArray.map(({heading, body}, index) => (
                        <AccordButton 
                            key={index} 
                            question={heading} 
                            answer={body}
                            isOpen={activeIndex === index}
                            onClick={() => handleAccordionClick(index)}
                        />
                            
                    ))
                }
            </div>
        </div>

)

}

export default FaqSection;