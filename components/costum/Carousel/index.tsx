import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";

const Carousel=()=> {
    return (
        <div id='carousel' className='max-w-[90rem] mx-auto'>
            <Swiper
                allowTouchMove={false}
                modules={[Autoplay]}
                loop={true}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                }}
                slidesPerView={2}
                style={{
                    width:"100%",
                    padding:"7% 0"
                }}
            >
                <SwiperSlide className='w-[50vw] max-w-[45rem] max-h-[27rem] h-[30vw] px-0' ><div className='banner w-full max-h-[27rem] h-[30vw] bg-amber-100' /></SwiperSlide>
                <SwiperSlide className='w-[50vw] max-w-[45rem] max-h-[27rem] h-[30vw] px-0' ><div className='banner w-full max-h-[27rem] h-[30vw] bg-amber-200' /></SwiperSlide>
                <SwiperSlide className='w-[50vw] max-w-[45rem] max-h-[27rem] h-[30vw] px-0' ><div className='banner w-full max-h-[27rem] h-[30vw] bg-amber-300' /></SwiperSlide>
                <SwiperSlide className='w-[50vw] max-w-[45rem] max-h-[27rem] h-[30vw] px-0' ><div className='banner w-full max-h-[27rem] h-[30vw] bg-amber-400' /></SwiperSlide>
                <SwiperSlide className='w-[50vw] max-w-[45rem] max-h-[27rem] h-[30vw] px-0' ><div className='banner w-full max-h-[27rem] h-[30vw] bg-amber-500' /></SwiperSlide>

            </Swiper>
        </div>
    );
}

export default Carousel;