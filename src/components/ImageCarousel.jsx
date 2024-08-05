import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';



// import required modules
import { Autoplay} from 'swiper/modules';

const images = [
    '/img/img-colors.png',
    '/img/img-color-rose.png',
    '/img/img-color-gris.png',
    '/img/img-color-blue.png',
    '/img/img-box.png',
]

export default function App() {
  return (
    <div className='cursor-pointer'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
       
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {images.map((imgSrc , id)=>
            (
                <SwiperSlide  key={id}>
                  <img src={imgSrc} alt={'image slide' + id} className='rounded-md max-w-[340px] sm:max-w-[380px] md:max-w-[420px]'  />
                </SwiperSlide>
            )
        )
        }
      </Swiper>
    </div>
  );
}
