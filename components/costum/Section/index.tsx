import React, {useMemo} from 'react';
import classNames from "classnames";
import IProduct from "../../../interfaces/product";
import ICategory from "../../../interfaces/category";
import Link from "next/link";
import CardSlider from "../CardSlider";
import CardsWrapper from "../CardsWrapper";

type slider = {
    title: string,
    products: IProduct[]
};

type wrapper = {
    category: ICategory,
    products: IProduct[]
}

type props = {
    slider?: slider,
    wrapper?: wrapper
}

const Section = ({slider, wrapper}: props) => {
    const wrapperClassName = useMemo(() => {
        return classNames(
            'w-full flex flex-col items-stretch justify-start py-8 gap-4',
            slider && 'bg-weef-black',
            wrapper && 'bg-secondary'
        )
    }, [slider, wrapper]);

    const paragraphClassName = useMemo(() => {
        return classNames(
            'w-fit text-weef-white px-[4rem] text-[2rem] font-medium',
            slider && 'bg-weef-black',
            wrapper && 'bg-secondary'
        )
    }, [slider, wrapper]);

    return (
        <div className={wrapperClassName}>
            <div className='relative w-full h-[4.5rem] flex items-center justify-center'>
                <div className='absolute w-full h-2 bg-primary'/>
                <div className='max-w-[1440px] w-full z-10 flex justify-start items-center'>
                    <p className={paragraphClassName}>
                        {slider && slider.title}
                        {wrapper &&
                            <Link
                                href={`/Category/${wrapper.category.parent?.slug}/${wrapper.category.slug}`}>
                                <a>{wrapper.category.name}</a>
                            </Link>}
                    </p>
                </div>
            </div>
            <div className='max-w-[1440px] w-full mx-auto'>
                {
                    slider && <CardSlider products={slider.products}/>
                }
                {
                    wrapper && <CardsWrapper products={wrapper.products}/>
                }
            </div>
        </div>
    );
}

export default Section;