import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

type TestimonialCardProps = {
  icon: JSX.Element;
  title: string;
  description: string;
  stars: number;
  optStyle?: string;
};

const Testimonialcard: React.FC<TestimonialCardProps> = ({ icon, title, description, stars, optStyle }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Function to render stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        className={`size-5 ${i < stars ? "text-yellow-500" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-lg lg:h-[350px] h-[300px] shadow-lg shadow-tet/20 text-center p-6 transform transition-all duration-500 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${optStyle}`}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold whitespace-nowrap mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-center space-x-2">{renderStars()}</div>
    </div>
  );
};

export default Testimonialcard;
