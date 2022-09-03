import React, {useCallback, useState} from 'react';
import ItemRow from "../ItemRow";
import {Colors} from "../../../utilities/constants/colors";
import Input from "../../common/Input";
import Button from "../../common/Button";
import _3DigitSeparator from "../../../utilities/functions/_3DigitSeparator";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {validateCoupon} from "../../../utilities/functions/ApiCall/coupon";
import {removeCoupon, setCoupon} from "../../../redux/slices/BasketSlice";

const BasketDiscount = () => {
    const {coupon} = useSelector((state: RootState) => state.BasketSlice);
    const [couponValue, setCouponValue] = useState<string>(coupon?.code || '')
    const dispatch = useDispatch()

    const checkCoupon = useCallback(() => {
        validateCoupon(couponValue)
            .then(([status, response]) => {
                if (status)
                    dispatch(setCoupon(response))
                else
                    dispatch(removeCoupon())
            })
    }, [couponValue, dispatch])

    return (
        <div className='w-full flex flex-col items-center gap-2 py-10 px-16'>
            <ItemRow backgroundContent={Colors._secondary_light} backgroundContentOnHover={Colors._black}>
                <div
                    className='text-weef-white w-full text-center h-full flex items-center justify-center gap-4'>
                    <div className='text-weef-white'>کد تخفیف:</div>
                    <div className='w-[320px]'>
                        <Input type='text' value={couponValue} className='h-9' widthOnPercent={100}
                               onChange={(e) => setCouponValue(e.target.value)}/>
                    </div>
                    <div className='pointer-events-auto'>
                        <Button onClick={checkCoupon} size='small'>اعمال</Button>
                    </div>
                </div>
            </ItemRow>
            {
                coupon &&
                <ItemRow backgroundContent={Colors._secondary_light}
                         backgroundContentOnHover={Colors._black}>
                    <div
                        className='text-weef-white w-full text-center h-full flex items-center justify-center gap-1'>
                        <div className='text-weef-white'>{_3DigitSeparator('' + coupon.discount)}</div>
                        <div
                            className='text-weef-white'>{coupon.discount_type === 'percent' ? 'درصد' : 'تومان'}</div>
                        <div className='text-weef-white'>تخفیف برای شما منظور شد</div>
                    </div>
                </ItemRow>
            }
        </div>
    );
}

export default React.memo(BasketDiscount);