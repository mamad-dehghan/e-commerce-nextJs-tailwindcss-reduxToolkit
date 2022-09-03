import React, {useCallback, useLayoutEffect, useState} from 'react';
import {ISuccessOrder} from "../../interfaces/order";
import {getAllOrders, orderSituationEnum, submitOrder} from "../../utilities/functions/ApiCall/order";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import PaypalInput from "../../components/costum/PaypalInput";
import {useDispatch} from "react-redux";
import {clearBasket} from "../../redux/slices/BasketSlice";
import Head from 'next/head';
import {toast} from "react-toastify";


const PayPal = () => {
    const router = useRouter()
    const [cookies] = useCookies(['token']);
    const [access, setAccess] = useState<boolean>(false);
    const [order, setOrder] = useState<ISuccessOrder>()
    const dispatch = useDispatch();

    const check = useCallback(() => {
        const orderId = parseInt(router.asPath.slice(22))
        getAllOrders(cookies.token)
            .then(async response => {
                const index: number = await response.findIndex((item: ISuccessOrder) => item.id == orderId);
                const currentOrder: ISuccessOrder | undefined = (index === -1) ? undefined : response[index];

                if (currentOrder && currentOrder.status === 'pending') {
                    setOrder(currentOrder);
                    setAccess(true);
                } else
                    await router.replace('/404', router.asPath)
            })
    }, [cookies.token, router.asPath, router.query.order])

    useLayoutEffect(() => {
        check()
    }, [])


    const sendToNextPage = useCallback((trackingCode: number) => {
        router.push(`/Payment/Bill/${trackingCode}`)
    }, [router])

    const handlePay = useCallback(() => {
        submitOrder(cookies.token, {
            id: order?.id,
            data: {
                ...order?.data,
                payOrderTime: new Date().toISOString(),
                trackingCode: order?.user + '' + Date.now()
            }
        }, orderSituationEnum.payed)
            .then(([status, response]) => {
                if (status) {
                    toast.success("پرداخت با موفقیت انجام شد")
                    dispatch(clearBasket())
                    sendToNextPage(response.data.trackingCode);
                } else {
                    toast.warning("در حال ارسال مجدد اطلاعات")
                    setTimeout(() => {
                        handlePay();
                    }, 5000)
                }
            })
    }, [cookies.token, order, sendToNextPage])

    const handleCancel = useCallback(() => {
        submitOrder(cookies.token, {
            id: order?.id,
            data: {
                ...order?.data,
                trackingCode: order?.user + '' + Date.now()
            }
        }, orderSituationEnum.canceled)
            .then(([status, response]) => {
                if (status) {
                    toast.success("پرداخت با شکست مواجه شد")
                    sendToNextPage(response.data.trackingCode);
                } else {
                    toast.warning("در حال ارسال مجدد اطلاعات")
                    setTimeout(() => {
                        handleCancel();
                    }, 5000)
                }
            })
    }, [cookies.token, order, sendToNextPage])

    return (
        access &&
        <div className='bg-weef-white min-h-screen w-full flex items-center justify-center'>
            <Head><title>صفحه پرداخت</title></Head>
            <div className='Container h-full'>
                <div className='flex w-full min-h-full items-end justify-center'>
                    <div
                        className='h-full w-[40%] min-w-[25rem] bg-weef-white rounded-t-3xl shadow-2xl z-20 border border-weef-black flex flex-col gap-2 px-4 py-20'>
                        <div key='price' className='w-full flex flex-col items-start gap-1'>
                            <label className='text-xs font-medium w-fit text-gray-700' htmlFor='price'>مبلغ
                                پرداختی</label>
                            <input disabled={true} className='w-full rounded-lg border border-gray-400 p-1' type="text"
                                   id='price' value={order?.total || ''} placeholder='price'/>
                        </div>
                        <PaypalInput title='شماره‌کارت'/>
                        <div className='flex w-full gap-4'>
                            <PaypalInput title='CVV2'/>
                            <PaypalInput title='تاریخ‌انقضاء'/>
                        </div>
                        <PaypalInput title='کد امنیتی'/>
                        <PaypalInput title='رمز دوم'/>
                        <div className='flex w-full gap-4'>
                            <PaypalInput title='ایمیل (اختیاری)'/>
                            <PaypalInput title='تلفن‌همراه (اختیاری)'/>
                        </div>
                        <div className='flex gap-4'>
                            <button
                                onClick={handlePay}
                                className="grow text-weef-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                پرداخت
                            </button>
                            <button
                                onClick={handleCancel}
                                className="w-1/3 text-weef-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayPal;