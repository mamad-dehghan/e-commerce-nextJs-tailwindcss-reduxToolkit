import React, {useCallback, useEffect, useState} from 'react';
import Button from "../../../common/Button";
import Input from '../../../common/Input';
import TextArea from "../../../common/TextArea";
import ManagementItem from "../ManagmentItem";
import {ISuccessOrder, singleProductOrder} from "../../../../interfaces/order";
import _3DigitSeparator from "../../../../utilities/functions/_3DigitSeparator";
import {Colors} from "../../../../utilities/constants/colors";
import RotatedButton from "../../../common/RotatedButton";
import IProduct from "../../../../interfaces/product";
import axios from "axios";
import {orderSituationEnum, submitOrder} from "../../../../utilities/functions/ApiCall/order";
import {useCookies} from "react-cookie";
import {getSpecificAddress} from "../../../../utilities/functions/ApiCall/address";
import {ISuccessUser} from "../../../../interfaces/editUser";

type props = {
    order: ISuccessOrder,
    toggleOpen: Function,
    user: ISuccessUser | undefined,
    handleChange: Function
}

const OrderModal = ({user, order, toggleOpen, handleChange}: props) => {
    const [cookies] = useCookies(['token'])
    const [address, setAddress] = useState<any>()

    useEffect(() => {
        getSpecificAddress(cookies.token, order.address)
            .then(response => {
                setAddress(response.address)
            })
    })

    const handleSubmit = useCallback(() => {
        submitOrder(
            cookies.token,
            {
                ...order,
                data: {
                    ...order.data,
                    checkOrderTime: new Date().toISOString()
                }
            }
            , orderSituationEnum.checked)
            .then(([status, response]) => {
                if (status)
                    handleChange(response)
            })
    }, [cookies.token, handleChange, order])

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center'
             style={{zIndex: 100}}>
            <div className='flex flex-col items-stretch w-[90%] max-h-[90%] shadow-lg bg-primary p-[1px] rounded-lg'>
                <div className='h-fit w-full p-8 bg-weef-black flex items-stretch rounded-t-lg'>
                    <div className='w-1/2 h-full flex flex-col items-stretch justify-start gap-2'>
                        <FormSectionInput title="نام" value={user?.first_name}/>
                        <FormSectionInput title="نام خانوادگی" value={user?.last_name}/>
                        <FormSectionTextArea title="آدرس" value={address}/>
                    </div>
                    <div className='w-1/2 h-full flex flex-col items-stretch justify-start gap-2'>
                        <FormSectionInput title="مبلغ نهایی" value={_3DigitSeparator((order.total).toString())}/>
                        <FormSectionInput title="شماره تماس" value={user?.phone}/>
                        <FormSectionInput title="تاریخ ثبت" value={(new Date(order.created)).toDateString()}/>
                        <FormSectionInput title="تاریخ ارسال"
                                          value={(new Date(order.data.sendOrderTime)).toDateString()}/>
                        {
                            (order.status === 'checked') &&
                            <FormSectionInput title="تاریخ تایید"
                                              value={(new Date(order.data.checkOrderTime)).toDateString()}/>

                        }
                    </div>
                </div>
                <div className='flex items-center justify-center p-3 bg-secondary gap-4'>
                    <Button onClick={() => toggleOpen(false)} size='medium'>بستن</Button>
                    {
                        !(order.status === 'checked') &&
                        <Button onClick={handleSubmit} size='medium'>تایید سفارش</Button>
                    }
                </div>
                <div className='rounded-b-lg bg-weef-black shrink overflow-hidden max-h-full py-8'>
                    <div className=' h-full overflow-y-auto'>
                        <div className='flex flex-col gap-2 px-16 items-center justify-start w-full'>
                            {
                                order.products.map((item, index) => (
                                    <Item key={item.product} productOrder={item} index={index + 1}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type itemPropsType = {
    productOrder: singleProductOrder,
    index: number
}

const Item = ({productOrder, index}: itemPropsType) => {
    const [productDetails, setProductDetails] = useState<IProduct | undefined>(undefined)
    useEffect(() => {
        axios(`http://localhost:8000/store/product/id/${productOrder.product}`)
            .then(res => setProductDetails(res.data));
    }, [productOrder.product])
    return (
        <>
            {
                productDetails &&
                <ManagementItem
                    heightOnPx={68}
                    items={[
                        {title: productDetails?.name || '', width: 25},
                        {title: `${productOrder.data.size} سایز`, width: 15},
                        {title: `${productOrder.data.color} رنگ`, width: 20},
                        {title: `${productOrder.quantity} عدد`, width: 15},
                        {title: `${_3DigitSeparator(productDetails?.final_price)} تومان`, width: 25}
                    ]}>
                    <RotatedButton
                        heightOnPx={68}
                        background={Colors._primary_orange}
                        className='absolute right-0 translate-x-[52%] text-sm'>
                        <span className='text-center'>{index}</span>
                    </RotatedButton>
                </ManagementItem>
            }
        </>
    );
}

type formSectionType = {
    title: string,
    value: any
}

const FormSectionInput = ({title, value}: formSectionType) => {
    return (
        value &&
        <div className='flex px-4 justify-between items-center'>
            <label htmlFor="name" className='text-weef-white whitespace-nowrap'>{title}</label>
            <div className='w-[70%]'>
                <Input value={value} disabled={true} type="text" id='name' placeholder='name'
                       className='h-9 text-center' widthOnPercent={100}/>
            </div>
        </div>
    )
}
const FormSectionTextArea = ({title, value}: formSectionType) => {
    return (
        value &&
        <div className='flex px-4 justify-between items-start'>
            <label htmlFor="name" className='text-weef-white whitespace-nowrap'>{title}</label>
            <div className='w-[70%]'>
                <TextArea value={value} disabled={true} type="text" id='name' placeholder='name' widthOnPercent={100}
                          className='text-center'/>
            </div>
        </div>
    )
}


export default OrderModal;