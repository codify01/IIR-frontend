import React from "react";
import { FaUserPlus, FaBullseye, FaMoneyBillWave, FaChartBar } from "react-icons/fa";
import FeatureCard from "../../components/card/FeatureCard";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-green-500 text-4xl" />,
      title: "Sign Up in Minutes",
      description: "Create an account quickly with our simple onboarding process.",
    },
    {
      icon: <FaBullseye className="text-blue-500 text-4xl" />,
      title: "Find Your Goals",
      description: "Define your financial goals to tailor your investment experience.",
    },
    {
      icon: <FaMoneyBillWave className="text-yellow-500 text-4xl" />,
      title: "Start Investing",
      description: "Begin your journey with confidence and expert guidance.",
    },
    {
      icon: <FaChartBar className="text-purple-500 text-4xl" />,
      title: "Monitor and Grow",
      description: "Track your progress in real time with detailed insights.",
    },
  ];

  return (
    <section className="py-16 bg-white" id="how">
      <div className="container">
        <div className="text-center text-pry mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="w-3/4 mx-auto">
            Start your investment journey in just a few simple steps.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ icon, title, description }, index) => (
            <FeatureCard
                key={index}
                icon={icon}
                title={title}
                description={description}
                optStyle="border-2 border-pry hover:-translate-y-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
