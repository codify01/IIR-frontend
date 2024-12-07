import React from "react";
import CarouselThree from "../../components/carousel/CarouselThree";

const Testimonial: React.FC = () => {

    return (

        <section className="py-10 bg-pry/5">
            <div className="container">
                <div className="text-center text-pry mb-12">
                    <h2 className="text-3xl font-bold">Testimonials</h2>
                    <p className="w-3/4 mx-auto">Find a reason to start investing today.</p>
                </div>
                <CarouselThree/>
            </div>
        </section>

    )

}

export default Testimonial;