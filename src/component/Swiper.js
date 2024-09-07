'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination, Navigation } from 'swiper/modules'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

const ReusableSwiper = ({
  data = [],
  slidesPerView = 4,
  autoHeight = true,
  spaceBetween = 30,
  pagination = true,
  navigation = true,
  nextButtonClass = "button-next", 
  prevButtonClass = "button-prev",
  breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 30 },
  },
  renderItem,
}) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      autoHeight={autoHeight}
      cssMode={true}
      initialSlide={0}
      spaceBetween={spaceBetween}
      freeMode={true}
      pagination={
        pagination
          ? {
              clickable: true,
              el: ".swiper-pagination",
              type: "bullets",
            }
          : false
      }
      navigation={
        navigation
          ? {
              nextEl: `.${nextButtonClass}`,
              prevEl: `.${prevButtonClass}`,
            }
          : false
      }
      modules={[FreeMode, Pagination, Navigation]}
      className="mySwiper relative"
      breakpoints={breakpoints}
    >
      {data.map((item, idx) => (
        <SwiperSlide key={idx}>{renderItem(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReusableSwiper;
