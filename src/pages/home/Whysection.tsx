import React from "react";
import { FaChartLine, FaPiggyBank, FaShieldAlt } from "react-icons/fa";
import { MdPieChart, MdSupportAgent } from "react-icons/md";
import { GiChart } from "react-icons/gi";
import FeatureCard from "../../components/card/FeatureCard";
  
const features = [
    {
    icon: <FaPiggyBank className="text-green-500 text-4xl" />,
    title: "Low Fees",
    description: "Invest with confidence without worrying about hidden costs.",
    },
    {
    icon: <FaChartLine className="text-blue-500 text-4xl" />,
    title: "High Returns",
    description: "Enjoy competitive returns through expertly managed portfolios.",
    },
    {
    icon: <GiChart className="text-yellow-500 text-4xl" />,
    title: "Custom Investment Plans",
    description: "Tailored strategies designed to meet your unique financial goals.",
    },
    {
    icon: <MdPieChart className="text-purple-500 text-4xl" />,
    title: "Diverse Portfolio Options",
    description: "Flexibility to invest in a variety of opportunities tailored to your goals.",
    },
    {
    icon: <MdSupportAgent className="text-orange-500 text-4xl" />,
    title: "24/7 Support",
    description: "Our team is always available to assist you with your investments.",
    },
    {
    icon: <FaShieldAlt className="text-red-500 text-4xl" />,
    title: "Secure Transactions",
    description: "Your data and funds are protected with bank-grade encryption.",
    },
];

const WhyUs: React.FC = () => {

    return (
    
        <div className="container">
            <div className="text-center space-y-2 text-pry mb-12">
                <h3 className="text-3xl font-bold">Why Choose Us?</h3>
                <p className="w-3/4 mx-auto">Join forces with a trusted investment partner who shares your vision for financial success</p>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map(({ icon, title, description }, index) => (
                        <FeatureCard
                            key={index}
                            icon={icon}
                            title={title}
                            description={description}
                        />
                    ))}
                </div>
            </div>
        </div>
  
    )
    
};

export default WhyUs;
