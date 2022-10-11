import React from 'react';
import DefaultLayout from "../../layouts/DefaultLayout";
import {useSelector} from "react-redux";
import BreadcrumbSection from "../../components/costum/BreadcrumbSection";
import BasketPageItem from "../../components/costum/BasketPageItem";
import BasketSum from "../../components/costum/BasketSum";
import {singleProductType} from "../../redux/slices/BasketSlice";
import Head from 'next/head'
import ItemRow from "../../components/costum/ItemRow";
import {RootState} from "../../redux/store";
import {Colors} from "../../utilities/constants/colors";
import BasketDiscount from "../../components/costum/BasketDiscount";


const Basket = () => {
    const {products} = useSelector((state: RootState) => state.BasketSlice);
    console.log('Basket')
    return (
        <>
            <div className='w-full flex flex-col'>
                <Head><title>سبد خرید</title></Head>
                <BreadcrumbSection options={[
                    {name: 'صفحه اصلی', link: '/'},
                    {name: 'سبد خرید', link: '/Basket', disable: true}]}/>
                <div className='Container'>
                    <div className='text-weef-white text-4xl font-medium py-10 px-10'>سبد خرید</div>
                    {
                        products.length === 0 ?
                            <div className='w-full flex flex-col items-center gap-2 py-10 px-16'>
                                <ItemRow backgroundContent={Colors._secondary}
                                         backgroundContentOnHover={Colors._black}>
                                    <div
                                        className='text-weef-white w-full text-center h-full flex items-center justify-center transition-all duration-300'>
                                        سبد خرید شما خالی است
                                    </div>
                                </ItemRow>
                            </div>
                            :
                            <div className='w-full flex flex-col items-center gap-2 py-10 pl-20 pr-32'>
                                {
                                    products.map((item: singleProductType) => (
                                            <BasketPageItem product={item.product} count={item.count}
                                                            key={item.product.id} size={item.attribute.size}
                                                            color={item.attribute.color}/>
                                        )
                                    )
                                }
                            </div>
                    }
                    <BasketDiscount/>
                    <div className='flex items-center justify-center w-full py-20'>
                        <BasketSum/>
                    </div>
                </div>
            </div>
        </>
    );
}

Basket.getLayout = DefaultLayout

export default Basket;