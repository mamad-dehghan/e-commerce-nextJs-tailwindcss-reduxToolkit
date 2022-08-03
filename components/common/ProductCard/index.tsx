import React, {useMemo, useState} from 'react';
import Image from "next/image";
import Button from "../Button";
import classNames from "classnames";
import PaletteItem from "./PaletteItem";
import SizeItem from "./SizeItem";
import _3DigitSeparator from "../../../utilities/functions/_3DigitSeparator";
import {useDispatch} from "react-redux";
import {addProduct, addToBasketType} from "../../../redux/slices/BasketSlice";
import {useRouter} from "next/router";
import IProduct from "../../../interfaces/IProduct";

type props = {
    product: IProduct,
}

const ProductCard = ({product}: props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [hover, setHover] = useState<boolean>(false);

    const classNameTop = useMemo(() => {
        return classNames(
            'absolute w-full bg-weef-black text-weef-white flex flex-row items-center p-4 h-9 gap-2 rounded-t top-0 left-0 transition-all duration-300 z-10',
            hover ? 'translate-y-0' : '-translate-y-full'
        )
    }, [hover]);

    const classNameShadow = useMemo(() => {
        return classNames(
            'absolute w-full h-full transition-all duration-300',
            hover ? 'bg-[#00000015]' : 'bg-transparent'
        )
    }, [hover]);

    const classNameDetails = useMemo(() => {
        return classNames(
            'h-[11rem] w-full flex flex-row p-2 gap-2 text-weef-white transition-all duration-300',
            hover ? 'bg-weef-black -translate-y-[3.5rem]' : 'bg-weef-secondary-light'
        )
    }, [hover]);

    const classNameColorPalette = useMemo(() => {
        return classNames(
            'flex flex-col justify-between py-5 transition-all duration-500 items-center ',
            hover ? 'h-full' : 'h-[6.5rem]'
        )
    }, [hover]);

    const handleAddToBasket = (e: any) => {
        e.stopPropagation();
        dispatch(addProduct({
            product,
            size: product.attributes.sizes ?product.attributes.sizes[0] : undefined,
            color: product.attributes.colors ?product.attributes.colors[0] : undefined
        }));
    }

    return (
        <div
            onClick={() => router.push(`/Products/${product.id}`)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative cursor-pointer items-stretch justify-items-stretch w-[15.5rem] h-80 ring-1 ring-primary-red overflow-hidden rounded'>
            <div className={classNameTop}>
                <span>سایزهای موجود:</span>
                {product.attributes.sizes && product.attributes.sizes.map(size => (
                    <SizeItem size={size} key={size}/>
                ))}
            </div>
            <div className='relative h-[12.5rem] w-full flex-shrink-0'>
                <Image objectFit={'cover'} src={product.main_image} layout={'fill'} alt={''}/>
                <div className={classNameShadow}/>
            </div>
            <div
                className={classNameDetails}>
                <div className='flex flex-col py-4 gap-6 px-2'>
                    <div>{product.name}</div>
                    <div>{_3DigitSeparator(product.final_price)}<span className='pr-2'>ریال</span></div>
                    <div>
                        <Button
                            onClick={handleAddToBasket}
                            size='small'>افزودن به سبد خرید</Button>
                    </div>
                </div>
                <div className={classNameColorPalette}>
                    {
                        product.attributes.colors && product.attributes.colors.map(color => (
                            <PaletteItem color={color} key={color}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductCard;