import React from 'react';
import DefaultLayout from "../../layouts/DefaultLayout";
import {useSelector} from "react-redux";
import BreadcrumbSection from "../../components/costum/BreadcrumbSection";
import IProduct from "../../interfaces/IProduct";
import BasketPageItem from "../../components/costum/BasketPageItem";
import BasketSum from "../../components/costum/BasketSum";
import { singleProductType} from "../../redux/slices/BasketSlice";


const Basket = () => {
    const {products} = useSelector((state: any) => state.BasketSlice);
    return (
        <DefaultLayout>
            <div className='w-full flex flex-col'>
                <BreadcrumbSection options={[
                    {name: 'صغحه اصلی', link: '/'},
                    {name: 'سبد خرید', link: '/Basket', disable: true}]}/>
                <div className='Container'>
                <div className='text-weef-white text-4xl font-medium py-10 px-10'>سبد خرید</div>
                    <div className='w-full flex flex-col items-center gap-2 py-10 pl-12 pr-28'>
                        {
                            products === [] ?
                                (
                                    <div>empty</div>
                                ) :
                                (
                                    products.map((item: singleProductType) => (
                                            <BasketPageItem product={item.product} count={item.count} key={item.product.id} size={item.attribute.size} color={item.attribute.color}/>
                                        )
                                    )
                                )
                        }
                    </div>
                    <div className='flex items-center justify-center w-full py-20'>
                        <BasketSum />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Basket;