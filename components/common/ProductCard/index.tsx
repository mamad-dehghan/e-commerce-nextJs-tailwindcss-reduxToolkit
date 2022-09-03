import React, {useMemo, useState} from 'react';
import Image from "next/image";
import Button from "../Button";
import classNames from "classnames";
import PaletteItem from "./PaletteItem";
import SizeItem from "./SizeItem";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../redux/slices/BasketSlice";
import {useRouter} from "next/router";
import IProduct from "../../../interfaces/product";
import style from './style.module.scss'

type props = {
    product: IProduct,
}

const ProductCard = ({product}: props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [hover, setHover] = useState<boolean>(false);

    const classNameTop = useMemo(() => {
        return classNames(
            'absolute w-full bg-weef-black text-weef-white flex flex-row items-center justify-between px-2 h-9 gap-2 rounded-t top-0 left-0 transition-all duration-300 z-10',
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
            'flex flex-col py-5 transition-all duration-500 items-center ',
            hover ? 'h-full' : 'h-[6.5rem]',
            product.attributes.colors?.length === 1 ? 'justify-center ' : 'justify-between '
        )
    }, [hover, product.attributes.colors]);

    const handleAddToBasket = (e: any) => {
        e.stopPropagation();
        dispatch(addProduct({
            product,
            size: product.attributes.sizes ? product.attributes.sizes[0] : undefined,
            color: product.attributes.colors ? product.attributes.colors[0] : undefined
        }));
    }

    return (
        <div
            onClick={() => router.push(`/Products/${product.id}`, undefined, {scroll: true})}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative cursor-pointer items-stretch justify-items-stretch w-[15.5rem] h-80 ring-1 ring-primary-red overflow-hidden rounded'>
            {
                product.attributes.sizes &&
                <div className={classNameTop}>
                    <span className='whitespace-nowrap'>سایزهای موجود:</span>
                    <div className={style.scrollHidden}>
                        <div dir='rtl' className='flex gap-2 items-center px-0.5 w-fit'>
                            {product.attributes.sizes.map(size => (
                                <SizeItem size={size} key={size}/>
                            ))}
                        </div>
                    </div>
                </div>
            }
            <div className='relative h-[12.5rem] w-full flex-shrink-0 overflow-hidden flex items-center justify-center'>
                <Image objectFit={'cover'} src={product.main_image} quality={50} layout={'fill'} alt={product.name}/>
                <div className={classNameShadow}/>
            </div>
            <div
                className={classNameDetails}>
                <div className='flex flex-col py-4 gap-6 px-2'>
                    <div>{product.name}</div>
                    <div>{product.price}<span className='pr-2'>تومان</span></div>
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

// export default ProductCard;
export default React.memo(ProductCard, (a, b) => a.product.id === b.product.id);