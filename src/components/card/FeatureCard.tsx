import React from 'react';
import { useInView } from 'react-intersection-observer';

type FeatureCardProps = {
    icon: JSX.Element;
    title: string;
    description: string;
    optStyle?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, optStyle }) => {
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <div ref={ref} className={`bg-white rounded-lg shadow-lg text-center p-6 transform transition-all duration-500 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${optStyle}`}>
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-lg font-semibold whitespace-nowrap mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default FeatureCard;