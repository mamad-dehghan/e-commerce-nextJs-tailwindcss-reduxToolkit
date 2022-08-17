import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {ISuccessOrder} from "../../../interfaces/order";
import Head from "next/head";
import SolidBackground from "../../../utilities/background/SolidBackground";
import AlertItem from "../../../components/costum/AlertItem";
import Accept from "../../../utilities/icons/Accept";
import Reject from "../../../utilities/icons/Reject";
import {getAllOrders} from "../../../utilities/functions/ApiCall/order";


const Bill = () => {
    const router = useRouter();
    const [cookies] = useCookies(['token']);
    const [order, setOrder] = useState<ISuccessOrder | undefined>(undefined)

    useEffect(() => {
        if (router.query.id) {
            const orderId = parseInt(router.query.id as string)
            getAllOrders(cookies.token)
                .then(response => {
                    const index: number = response.findIndex((item: ISuccessOrder) => item.data?.trackingCode == orderId);

                    const currentOrder: ISuccessOrder | undefined = (index === -1) ? undefined : response[index];
                    if (currentOrder && (currentOrder.status === 'payed' || currentOrder.status === 'canceled'))
                        setOrder(currentOrder)
                    else
                        router.replace('/404', `/Payment/Bill/${router.query.id}`)
                })
        }
    }, [router.query.id])

    return (
        order &&
        <div className='w-full h-screen bg-secondary'>
            <Head>
                <title>قبض پرداخت</title>
            </Head>
            <SolidBackground/>
            <div className='flex flex-col gap-2 justify-center items-center h-full w-full pb-16'>
                {
                    order.status === 'payed' ?
                        <>
                            <div className='flex pb-16'><Accept className='fill-green-600 w-32 h-32'/></div>
                            <AlertItem text='پرداخت با موفقیت انجام شد'/>
                            <AlertItem text={`کد رهگیری: ${order.data.trackingCode}`}/>
                        </> :
                        <>
                            <div className='flex pb-16'><Reject className='fill-red-600 w-32 h-32'/></div>
                            <AlertItem text='پرداخت با شکست مواجه شد'/>
                            <AlertItem text={`کد رهگیری: ${order.data.trackingCode}`}/>
                            <AlertItem
                                text='در صورت عدم بازگشت مبلغ پرداختی تا 72 ساعت بعد با پشتیبانی سایت تماس بگیرید'/>
                            <AlertItem text='بازگشت به سبد خرید' link='/Basket'/>
                        </>
                }
                <AlertItem text='بازگشت به صفحه اصلی' link='/'/>
            </div>
        </div>
    );
}

export default Bill;