import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import IProduct from "../../../interfaces/product";
import axios from "axios";
import _3DigitSeparator from "../../../utilities/functions/_3DigitSeparator";
import SearchModalItem from "./SearchModalItem";
import style from './style.module.scss'

type props = {
    value: string,
    isFocus?: boolean,
    toggleFocus: Function
}

const SearchResultModal = ({value, isFocus, toggleFocus}: props) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [focus, setFocus] = useState<boolean>();

    useEffect(() => {
        toggleFocus(focus)
    }, [focus])


    const handleSearch = useCallback(async () => {
        const searchProducts: IProduct[] = await axios(`http://localhost:8000/store/product/search/?search=${value}`)
            .then((res: any) => res.data);
        const a = searchProducts.slice(0, 3).map((item: IProduct) => {
            return {
                ...item,
                price: _3DigitSeparator(item.price),
                final_price: _3DigitSeparator(item.final_price)
            }
        });
        setProducts(a);
    }, [value]);


    useLayoutEffect(() => {
        handleSearch().then();
    }, [value])

    return (
        isFocus && value.length > 0 ?
            <div
                onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                className='absolute top-[130%] left-0 w-full z-50 border border-primary-red p-1 rounded bg-weef-black max-h-[300px] overflow-hidden'>
                <div
                    className={style.scrollHidden}>
                    <div key={value} className='w-full h-fit bg-weef-black gap-1 flex flex-col items-stretch rounded'>
                        {
                            products.length === 0 ?
                                <div
                                    className='w-full h-fit bg-secondary hover:bg-weef-black rounded p-2 flex items-center'>
                                    <p className='text-weef-white'>متاسفانه محصولی یافت نشد</p>
                                </div>
                                :
                                products.map((item: any) => (
                                    <SearchModalItem key={item.id} product={item}/>
                                ))
                        }
                    </div>
                </div>
            </div> :
            <></>
    );
}

export default SearchResultModal;