import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import _3DigitSeparator from "../../../utilities/functions/_3DigitSeparator";
import {clearBasket} from "../../../redux/slices/BasketSlice";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import RotatedButton from "../../common/RotatedButton";

const BasketSum = () => {
    const {finalSum, countSum, coupon} = useSelector((state: RootState) => state.BasketSlice)
    const dispatch = useDispatch();
    const router = useRouter();

    const handleClearBasket = useCallback(() => {
        dispatch(clearBasket())
    }, [dispatch])

    const handleConfirm = useCallback(() => {
        if (countSum !== 0)
            router.push('/Payment/information');
        else {
            toast.clearWaitingQueue();
            toast.error('سبد خرید شما خالی است');
        }
    }, [])

    const calculateDiscount = useMemo(() => {
        if (coupon) {
            if (coupon.discount_type==='percent')
                return finalSum * coupon.discount /100
            else
                return Math.min(coupon.discount, finalSum)
        }
        return 0
    }, [coupon, finalSum])

    return (
        <div className='relative overflow-visible'>
            <RotatedButton onClick={handleClearBasket} title='حذف همه محصول ها'
                           heightOnPx={96} background='linear'
                           className='absolute top-full left-0 -translate-x-[40.5px] -translate-y-[50%]'>
                <span>حذف</span>
            </RotatedButton>
            <RotatedButton onClick={handleConfirm}
                           heightOnPx={148} background='linear'
                           className='absolute top-0 right-0 translate-x-[33.5px] -translate-y-1/2'>
                <span className='whitespace-nowrap'>نهایی کردن خرید</span>
            </RotatedButton>
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
                    <span>{_3DigitSeparator((finalSum-calculateDiscount).toString())}</span>
                    <span>تومان</span>
                </div>
            </div>
        </div>
    );
}

export default BasketSum;