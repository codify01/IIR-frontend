import React from "react";
import Testimonialcard from "../card/Testimonialcard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarouselThree: React.FC = () => {
  const testimonies = [
    {
      name: "Sarah Thompson",
      testimonial: "This service exceeded my expectations! The team was professional, and their attention to detail was impeccable. I’ll definitely be recommending them to my friends and family.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      star: 4,
    },
    {
      name: "Mark Daniels",
      testimonial: "I was skeptical at first, but I’m glad I gave it a chance. The customer support was outstanding, and the results were delivered on time and as promised.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      star: 5,
    },
    {
      name: "Emily Richards",
      testimonial: "Amazing experience from start to finish. The process was smooth, and the quality was top-notch. I will certainly be returning for future projects!",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      star: 3,
    },
    {
      name: "James Carter",
      testimonial: "The team went above and beyond to ensure everything was perfect. It’s rare to find this level of dedication. Highly recommend!",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      star: 4,
    },
  ];

  return (
    <div className="carousel">
      <Swiper
        pagination={{
          clickable: true,
          type: "bullets",
          dynamicBullets: true,
        }}
        navigation={{
          
        }}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper testi-swiper lg:h-[70vh] h-[33vh] py-10"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 30 },
          640: { slidesPerView: 1, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
          1280: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {testimonies.map(({ name, testimonial, image, star }, index) => (
          <SwiperSlide className="lg:px-2 px-5" key={index}>
            <Testimonialcard
              icon={<img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />}
              title={name}
              description={testimonial}
              stars={star}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselThree;
