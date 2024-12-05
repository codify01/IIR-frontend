// import React from 'react';
import img3 from "../../assets/image/img3.png"
import img4 from "../../assets/image/img4.png"
import img5 from "../../assets/image/img5.png"
import img6 from "../../assets/image/img6.png"
// import "swiper/css";
// import "swiper/css/scrollbar";
// import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import CardOne from '../card/Cardone';

const CarouselTwo = () => {

  return (
    <Swiper
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      loop={true}
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
            <CardOne title={"Welcome To Pineleafestates Investment"} cta={"Get Started"} picture={img3} description={"We believe in integrity, commitment to excellence and professional attitude."} />
        </SwiperSlide>
        <SwiperSlide>
            <CardOne title={"Assured and Real-time Profit"} cta={"Get Started"} picture={img4} description={"We believe in integrity, commitment to excellence and professional attitude."} />
        </SwiperSlide>
        <SwiperSlide>
            <CardOne title={"Get your money to work for you with ease"} cta={"Get Started"} picture={img5} description={"We believe in integrity, commitment to excellence and professional attitude."} />
        </SwiperSlide>
        <SwiperSlide>
            <CardOne title={"Flexible Payment and withdrawals"} cta={"Get Started"} picture={img6} description={"We believe in integrity, commitment to excellence and professional attitude."} />
        </SwiperSlide>
    </Swiper>
  );
};

export default CarouselTwo;
