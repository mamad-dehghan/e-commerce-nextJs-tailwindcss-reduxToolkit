import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import _3DigitSeparator from "../../../utilities/functions/_3DigitSeparator";
import {clearBasket} from "../../../redux/slices/BasketSlice";

const BasketSum = () => {
    const {finalSum, countSum} = useSelector((state: RootState) => state.BasketSlice)
    const dispatch = useDispatch();

    const handleClearBasket = useCallback(() => {
        dispatch(clearBasket())
    }, [dispatch])

    return (
        <div className='relative overflow-visible'>
            <button onClick={handleClearBasket}
                    title='حذف همه محصول ها'
                    className='absolute bottom-0 left-0 -translate-x-[40px] translate-y-1/2 w-[68px] h-[68px] rotate-45 group from-primary-red to-primary-orange bg-gradient-to-tr p-[1px] flex items-center justify-center z-20'>
                            <span
                                className='w-full h-full bg-weef-black group-hover:bg-transparent flex items-center justify-center'>
                                <span className='-rotate-45 text-weef-white group-hover:text-weef-black'>حذف</span>
                            </span>
            </button>
            <button
                className='absolute top-0 right-0 translate-x-[33px] -translate-y-1/2 w-[105px] h-[105px] rotate-45 group from-primary-red to-primary-orange bg-gradient-to-tr p-[1px] flex items-center justify-center z-20'>
                            <span
                                className='w-full h-full bg-weef-black group-hover:bg-transparent flex items-center justify-center overflow-hidden'>
                                <span
                                    className='-rotate-45 text-weef-white group-hover:text-weef-black whitespace-nowrap'>
                                    نهایی کردن خرید
                                </span>
                            </span>
            </button>
            <div
                className='absolute top-1/2 left-1/2 bg-weef-secondary-light -translate-x-1/2 -translate-y-1/2 h-[110px] w-[520px] -skew-x-[45deg]'/>
            <div className='flex flex-row items-center justify-center h-[110px] w-[520px] text-weef-white pr-4 gap-4'>
                <div className='text-xl z-10'>جمع نهایی</div>
                <div
                    className='text-xl z-10 w-9 h-9 p-[1px] bg-primary rounded-full flex items-center justify-center overflow-hidden'>
                    <div
                        className='w-full h-full bg-weef-black flex items-center justify-center rounded-full'>x{countSum}</div>
                </div>
                <div className='text-xl z-10 flex justify-center gap-1 items-center'>
                    <span>{_3DigitSeparator(finalSum.toString())}</span>
                    <span>تومان</span>
                </div>
            </div>
        </div>
    );
}

export default BasketSum;