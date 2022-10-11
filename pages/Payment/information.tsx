import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import DefaultLayout from "../../layouts/DefaultLayout";
import Head from 'next/head';
import BreadcrumbSection from "../../components/costum/BreadcrumbSection";
import Input from "../../components/common/Input";
import {useFormik} from "formik";
import * as Yup from 'yup';
import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {RootState} from "../../redux/store";
import {checkLogin, submitUserInformation} from "../../utilities/functions/ApiCall/login";
import {submitPendingOrder} from "../../utilities/functions/ApiCall/order";
import {findOrCreateAddress} from "../../utilities/functions/ApiCall/address";
import {useCookies} from "react-cookie";
import compactProductsForApi from "../../utilities/functions/compactProductsForApi";
import {singleProductOrder} from "../../interfaces/order";
import {toast} from "react-toastify";

interface formValues {
    firstName: string,
    lastName: string,
    address: string,
    sendOrderTime: string,
    phoneNumber: string | number
}

const InformationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'نام معتبر نیست')
        .max(50, 'نام معتبر نیست')
        .required('نام ضروری است'),
    lastName: Yup.string()
        .min(2, 'نام‌خانوادگی معتبر نیست')
        .max(50, 'نام‌خانوادگی معتبر نیست')
        .required('نام‌خانوادگی ضروری است'),
    address: Yup.string()
        .required('آدرس ضروری است'),
    phoneNumber: Yup.string()
        ?.matches(/^[+0123456789]+$/, 'تلفن‌همراه معتبر نیست')
        .min(11, 'تلفن‌همراه معتبر نیست')
        .max(13, 'تلفن‌همراه معتبر نیست')
        .required('تلفن‌همراه ضروری است'),
    sendOrderTime: Yup.date()
        .typeError('زمان‌تحویل معتبر نیست')
        .min(new Date((new Date()).setDate((new Date()).getDate() + 3)), 'حداقل 3 روز است')
        .max(new Date((new Date()).setDate((new Date()).getDate() + 10)), 'حداکثر 10 روز است')
        .required('زمان‌تحویل ضروری است')
});

const initialFormValues: formValues = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    sendOrderTime: ''
}

const initialOrder = {
    address: 0 as number,
    coupon: null as (string | null),
    data: '' as any,
    status: 'pending' as string,
    products: [] as singleProductOrder[],
}

const PaymentInformation = () => {
    const router = useRouter();
    const {products: basketProducts, countSum, coupon} = useSelector((state: RootState) => state.BasketSlice);
    const [order, setOrder] = useState<any>(initialOrder)
    const [cookies] = useCookies(['token']);
    const [rememberMeCookie] = useCookies<string>(['rememberMe']);
    const [initialFormikValues, setInitialFormikValues] = useState<formValues>(initialFormValues)
    console.log('PaymentInformation')
    useLayoutEffect(() => {
        if (countSum === 0)
            router.replace('/404', '/Payment/information');
        setOrder((pre: any) => ({
            ...pre,
            coupon: coupon ? coupon.code : null,
            products: compactProductsForApi(basketProducts)
        }))
        checkLogin(cookies.token)
            .then(([isLogin, response]) => {
                if (isLogin) {
                    if (rememberMeCookie.rememberMe === 'true') {
                        setInitialFormikValues({
                            ...initialFormikValues,
                            firstName: response.first_name || '',
                            lastName: response.last_name || '',
                            phoneNumber: response.phone || ''
                        });
                    }
                } else {
                    router.replace({pathname: '/Login', query: {next: '/Payment/information'}})
                }
            })

    }, []);

    const formik = useFormik({
        initialValues: initialFormikValues,
        enableReinitialize: true,
        validationSchema: InformationSchema,
        onSubmit: values => {
            setOrder((pre: any) => ({
                ...pre,
                data: {
                    sendOrderTime: (new Date(values.sendOrderTime).toISOString())
                }
            }))
            submitProcess(values)
        },
    });

    const sendOrder = useCallback(() => {
        submitPendingOrder(cookies.token, order)
            .then(([status, response]) => {
                if (status)
                    router.push({pathname: '/Payment/PayPal', query: {order: response.id}})
                else
                    toast('failed order')
            })

    }, [cookies.token, order, router])

    const sendData = useCallback(() => {
        submitUserInformation(cookies.token, {
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            phone: formik.values.phoneNumber,
        }).then(([status,]) => {
            if (status) {
                sendOrder();
            } else {
                toast("failed information")
                formik.resetForm()
            }
        })
    }, [cookies.token, formik, sendOrder])

    const sendAddressData = useCallback((values: any) => {
        findOrCreateAddress(cookies.token, values)
            .then(([status, addressID]: any) => {
                if (status)
                    setOrder((pre: any) => ({
                        ...pre,
                        address: addressID
                    }))
                else
                    toast.error('address')
            })
    }, [])

    useEffect(() => {
        if (order.address !== 0)
            sendData();
    }, [order])

    const submitProcess = useCallback((values: formValues) => {
        sendAddressData({
            name: Date.now().toString(),
            phone: values.phoneNumber,
            address: values.address
        })
    }, [])

    return (
        cookies.token &&
        <>
            <div className='bg-secondary flex items-center justify-center w-full flex-col pb-16'>
                <Head><title>تکمیل اطلاعات خرید</title></Head>
                <BreadcrumbSection options={[]}/>
                <form onSubmit={formik.handleSubmit}
                      className='bg-weef-black border-[1px] border-primary-red flex flex-col z-20 px-4 py-6 gap-3 w-[560px] rounded-lg'>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="firstName" className='w-fit self-start text-weef-white'>نام:</label>
                        <div className='w-full flex justify-end'>
                            <Input
                                widthOnPercent={65}
                                type='text'
                                className='placeholder:text-right'
                                id='firstName' name='firstName'
                                about={formik.errors.firstName}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                placeholder='نام'/>
                        </div>
                    </div>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="lastName" className='w-fit self-start text-weef-white'>نام‌خانوادگی:</label>
                        <div className='w-full flex justify-end'>
                            <Input
                                widthOnPercent={65}
                                type='text'
                                className='placeholder:text-right'
                                id='lastName' name='lastName'
                                about={formik.errors.lastName}
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                placeholder='نام‌خانوادگی'/>
                        </div>
                    </div>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="address" className='w-fit self-start text-weef-white'>آدرس:</label>
                        <div className='w-full flex justify-end'>
                            <TextArea
                                widthOnPercent={65}
                                className='placeholder:text-right'
                                id='address' name='address'
                                about={formik.errors.address}
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                placeholder='آدرس'/>
                        </div>
                    </div>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="sendOrderTime" className='w-fit self-start text-weef-white'>زمان‌تحویل:</label>
                        <div className='w-full flex justify-end'>
                            <Input
                                widthOnPercent={65}
                                type="date"
                                className='placeholder:text-right text-center'
                                id='sendOrderTime' name='sendOrderTime'
                                about={formik.errors.sendOrderTime}
                                onChange={formik.handleChange}
                                value={formik.values.sendOrderTime}
                                placeholder='زمان‌تحویل'/>
                        </div>
                    </div>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="phoneNumber" className='w-fit self-start text-weef-white'>تلفن‌همراه:</label>
                        <div className='w-full flex justify-end'>
                            <Input
                                widthOnPercent={65}
                                type='text'
                                className='placeholder:text-right'
                                id='phoneNumber' name='phoneNumber'
                                about={formik.errors.phoneNumber}
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                placeholder='تلفن‌همراه'/>
                        </div>
                    </div>
                    <div className='w-fit self-end pt-2 px-4'>
                        <Button disable={!formik.isValid} type='submit' size='medium'>انتقال به صفحه پرداخت</Button>
                    </div>
                </form>
            </div>
        </>
    );
}
PaymentInformation.getLayout = DefaultLayout

export default PaymentInformation;
