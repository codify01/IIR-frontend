import React from "react";
import CarouselThree from "../../components/carousel/CarouselThree";

const Testimonial: React.FC = () => {

    return (

        <div className="container">
            <div className="text-center text-pry mb-12">
                <h2 className="text-3xl font-bold">Testimonials</h2>
                <p className="w-3/4 mx-auto">Find a reason to start investing today.</p>
            </div>
            <CarouselThree/>
            <div className="mt-10 w-full rounded-3xl overflow-hidden flex items-center relative z-[1] justify-center quotesection lg:h-[50vh] h-[30vh]">
                <div className="overlay w-full h-full bg-pry/80 absolute -z-[1]"></div>
                <h3 className="lg:text-4xl text-3xl lg:w-3/4 w-11/12 mx-auto text-center font-bold text-gray-200">Investing is the best way to escape poverty. Invest in something appreciating today!</h3>
            </div>
        </div>
        
    )

}

export default Testimonial;