import React from 'react';
import img3 from "../../assets/image/img3.png"
import img4 from "../../assets/image/img4.png"
import img5 from "../../assets/image/img5.png"
import img6 from "../../assets/image/img6.png"
// import "swiper/swiper.css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import CardOne from '../card/Cardone';  

const CarouselOne: React.FC = () => {

  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        type: 'bullets',
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper pb-10"
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 1, spaceBetween: 10 },
        1024: { slidesPerView: 1, spaceBetween: 10 },
        1280: { slidesPerView: 1, spaceBetween: 10 },
      }}
    >
        <SwiperSlide>
          <CardOne picture={img3} imgOptStyle={"w-full h-[300px] object-contain"} />
        </SwiperSlide>
        <SwiperSlide>
          <CardOne picture={img4} imgOptStyle={"w-full h-[300px] object-contain"} />
        </SwiperSlide>
        <SwiperSlide>
          <CardOne picture={img5} imgOptStyle={"w-full h-[300px] object-contain"} />
        </SwiperSlide>
        <SwiperSlide>
          <CardOne picture={img6} imgOptStyle={"w-full h-[300px] object-contain"} />
        </SwiperSlide>
    </Swiper>
  );
};

export default CarouselOne;
