import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';



// import required modules
import { Autoplay} from 'swiper/modules';

const images = [
    '/public/img/img-colors.JFIF',
    '/public/img/img-color-rose.JFIF',
    '/public/img/img-color-gris.JFIF',
    '/public/img/img-color-blue.JFIF',
    '/public/img/img-box.JFIF',
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
                  <img src={imgSrc} alt={'image slide' + id} className=' max-w-[340px] sm:max-w-[380px] md:max-w-[420px]'  />
                </SwiperSlide>
            )
        )
        }
      </Swiper>
    </div>
  );
}
