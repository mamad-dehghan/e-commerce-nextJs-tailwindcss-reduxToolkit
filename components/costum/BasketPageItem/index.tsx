import React, {useCallback, useMemo, useState} from 'react';
import IProduct from "../../../interfaces/product";
import classNames from "classnames";
import Image from 'next/image'
import Link from "next/link";
import {useDispatch} from "react-redux";
import {addProduct, removeAllSingleProduct, removeProduct} from '../../../redux/slices/BasketSlice';
import MultiButton from "../../common/MultiButton";
import PaletteItem from "../../common/ProductCard/PaletteItem";
import SizeItem from "../../common/ProductCard/SizeItem";
import ItemRow from "../ItemRow";
import {Colors} from "../../../utilities/constants/colors";
import RotatedButton from "../../common/RotatedButton";

type props = {
    product: IProduct,
    count: number,
    size: string | undefined,
    color: string | undefined
}

const BasketPageItem = ({product, count, color = undefined, size = undefined}: props) => {
    const [hover, setHover] = useState<boolean>(false);
    const dispatch = useDispatch()

    const wrapperClassName = useMemo(() => {
        return classNames(
            'w-full h-full flex justify-between items-center transition-all duration-75 pr-20 pl-14',
            hover ? 'bg-weef-black' : 'bg-weef-secondary-light'
        )
    }, [hover])

    const imageWrapper = useMemo(() => {
        return classNames(
            'absolute top-1/2 right-0 -translate-y-1/2 rotate-45 group transition-all duration-300',
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
            <ItemRow backgroundContent={Colors._secondary_light} backgroundContentOnHover={Colors._black}
                     toggleHover={setHover} heightOnPx={96}>
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
                        <MultiButton id={product.id} reduceCount={handleReduce}
                                     increaseCount={handleIncrease}/>
                        <span
                            className='text-weef-white'><span>{product.final_price}</span><span
                            className='px-2'>تومان</span></span>
                    </div>
                </div>
                <RotatedButton className='absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' heightOnPx={96} title='حذف این محصول' onClick={handleRemoveAll} background={Colors._primary_red}>
                    <div className='text-weef-white group-hover:text-weef-black'>حذف</div>
                </RotatedButton>
                <RotatedButton className={imageWrapper} heightOnPx={146} background={Colors._primary_orange}>
                    <div className='flex justify-center items-center overflow-visible w-full h-full scale-[1.4]'>
                    <Image className='select-none' src={product.main_image} alt={product.name}
                           objectFit={'cover'} layout={'fill'}/>
                    </div>
                </RotatedButton>
            </ItemRow>
    );
}

export default BasketPageItem;