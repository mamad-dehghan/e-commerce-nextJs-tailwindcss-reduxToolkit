import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import  {Navigation} from 'swiper'
import ProductCard from "../../common/ProductCard";
import SwiperButton from "../../../utilities/icons/SwiperButton";
import 'swiper/css/navigation';
import 'swiper/css';
import IProduct from "../../../interfaces/IProduct";

type props = {
    products: IProduct[]
}

const CardSlider=({products}: props)=> {


    return (
        <>
            <div className='Container cardSlider'>
                <div className='w-full overflow-hidden lg:px-6  py-1'>
                    <Swiper
                        className='sm:w-[600px] md:w-[680px] lg:w-[936px] xl:w-[1200px]  mx-auto   '
                        navigation={{
                            prevEl: '.prev',
                            nextEl: '.next',
                        }}
                        initialSlide={1}
                        modules={[Navigation]}
                        spaceBetween={8}
                        slidesPerView={1}
                        breakpoints={{
                            640:{
                                slidesPerView:2,
                                initialSlide:2
                            },
                            1024: {
                                slidesPerView: 3,
                                initialSlide: 3
                            },
                            1280: {
                                slidesPerView: 4,
                                initialSlide: 4
                            }
                        }}
                    >
                        {products.map(product => (
                            <SwiperSlide key={product.id}>
                                <ProductCard title={product.name}
                                             image={product.main_image}
                                             price={product.price}
                                             sizes={product.attributes.sizes}
                                             colors={product.attributes.colors}/>
                            </SwiperSlide>
                        ))}
                        <span className='prev absolute -translate-y-1/2 right-1 top-1/2 z-20 '
                              slot='container-start'>
                            <SwiperButton direction='right'/>
                        </span>
                        <span className='next absolute -translate-y-1/2 top-1/2 z-20 left-1' slot='container-start'>
                            <SwiperButton direction='left'/>
                        </span>
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default CardSlider;