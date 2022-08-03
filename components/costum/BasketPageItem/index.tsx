import React, {useCallback, useMemo, useState} from 'react';
import IProduct from "../../../interfaces/IProduct";
import classNames from "classnames";
import Image from 'next/image'
import Link from "next/link";
import {useDispatch} from "react-redux";
import {addProduct, removeAllSingleProduct, removeProduct} from '../../../redux/slices/BasketSlice';
import MultiButton from "../../common/MultiButton";
import PaletteItem from "../../common/ProductCard/PaletteItem";
import SizeItem from "../../common/ProductCard/SizeItem";
import _3DigitSeparator from "../../../utilities/functions/_3DigitSeparator";

type props = {
    product: IProduct,
    count: number,
    size: string | undefined,
    color: string | undefined
}

const BasketPageItem = ({product, count, color = undefined, size = undefined}: props) => {
    const [hover, setHover] = useState<boolean>(false);
    const dispatch = useDispatch()

    const containerClassName = useMemo(() => {
        return classNames(
            'h-[96px] max-w-[980px] w-full p-[1px] bg-weef-secondary-light hover:bg-primary overflow-visible relative',
            hover ? 'z-10' : ''
        )
    }, [hover])

    const wrapperClassName = useMemo(() => {
        return classNames(
            'w-full h-full flex justify-between items-center transition-all duration-75 pr-20 pl-14',
            hover ? 'bg-weef-black' : 'bg-weef-secondary-light'
        )
    }, [hover])

    const imageWrapper = useMemo(() => {
        return classNames(
            'absolute top-0 right-0  translate-y-[calc(100%-105px)] w-[105px] h-[105px] rotate-45 group bg-primary-orange p-[1px] flex items-center justify-center transition-all duration-300',
            hover ? 'scale-125 translate-x-[71px]' : 'translate-x-1/2'
        )
    }, [hover])

    const handleReduce = useCallback(() => {
        if (count > 0)
            dispatch(removeProduct(product))
    }, [count, dispatch, product])

    const handleIncrease = useCallback(() => {
        dispatch(addProduct({
            product,
            size: product.attributes.sizes ? product.attributes.sizes[0] : undefined,
            color: product.attributes.colors ? product.attributes.colors[0] : undefined
        }));
    }, [dispatch, product])

    const handleRemoveAll = useCallback(() => {
        dispatch(removeAllSingleProduct(product))
    }, [dispatch, product])


    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
             className={containerClassName}>
            <div className={wrapperClassName}>
                <div className='w-2/5 flex items-center justify-between'>
                    <Link href={`/Products/${product.id}`}>
                        <a className='w-fit'><p className='link inline-block text-xl'>{product.name}</p></a>
                    </Link>
                    <div className='flex items-center gap-4'>
                        {color && <PaletteItem color={color}/>}
                        {size && <SizeItem size={size}/>}
                    </div>
                </div>
                <div className='w-2/5 flex items-center justify-between '>
                    <MultiButton initialCount={count} reduceCount={handleReduce}
                                 increaseCount={handleIncrease}/>
                    <span
                        className='text-weef-white '><span>{_3DigitSeparator(product.final_price)}</span><span
                        className='px-2'>ريال</span></span>
                </div>
            </div>
            <button onClick={handleRemoveAll}
                    title='حذف این محصول'
                    className='absolute top-0 left-0 -translate-x-1/2 translate-y-[calc(100%-54px)] w-[68px] h-[68px] rotate-45 group bg-primary-red p-[1px] flex items-center justify-center'>
                <span
                    className='w-full h-full bg-weef-black group-hover:bg-transparent flex items-center justify-center'>
                    <span className='-rotate-45 text-weef-white group-hover:text-weef-black'>حذف</span>
                </span>
            </button>
            <div className={imageWrapper}>
                <span
                    className='w-full h-full bg-weef-black flex items-center justify-center overflow-hidden'>
                    <span className='-rotate-45 text-weef-white group-hover:text-weef-black'>
                        <Image src={product.main_image} alt={product.name} layout={'fixed'} width='150%'
                               height='150%'/>
                    </span>
                </span>
            </div>
        </div>
    );
}

export default BasketPageItem;