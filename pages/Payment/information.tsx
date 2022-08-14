import React, {useCallback, useLayoutEffect} from 'react';
import DefaultLayout from "../../layouts/DefaultLayout";
import Head from 'next/head';
import BreadcrumbSection from "../../components/costum/BreadcrumbSection";
import Input from "../../components/common/Input";
import {useFormik} from "formik";
import * as Yup from 'yup';
import Button from '../../components/common/Button';
import TextArea from '../../components/common/TextArea';
import {alterAddAddress, AuthSliceType} from "../../redux/slices/AuthenticationSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import axios, {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {AppDispatch, RootState} from "../../redux/store";
import {saveAddress, saveOrderSendTime, saveProducts} from "../../redux/slices/OrderSlice";


interface formValues {
    firstName: string,
    lastName: string,
    address: string,
    postalNumber: number | undefined,
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
        .matches(/^[+0123456789]+$/, 'تلفن‌همراه معتبر نیست')
        .min(11, 'تلفن‌همراه معتبر نیست')
        .max(13, 'تلفن‌همراه معتبر نیست')
        .required('تلفن‌همراه ضروری است'),
    postalNumber: Yup.number()
        .typeError('کدپستی معتبر نیست')
        .min(1000000000, 'کدپستی معتبر نیست')
        .max(9999999999, 'کدپستی معتبر نیست')
        .required('کدپستی ضروری است')
});


const PaymentInformation = () => {
    const router = useRouter();
    const {products: basketProducts, countSum} = useSelector((state: RootState) => state.BasketSlice)
    useLayoutEffect(() => {
        if (countSum === 0)
            router.replace({pathname: '/404'}, '/Payment/information');
        dispatch(saveProducts(basketProducts));
    }, [])

    const dispatch: AppDispatch = useDispatch();
    const {
        logStatus,
        token,
        username,
        remember,
        first_name,
        last_name,
        phone,
        address
    }: AuthSliceType = useSelector((state: any) => state.AuthenticationSlice);
    const {currentOrder} = useSelector((state: RootState) => state.OrderSlice)
    useLayoutEffect(() => {
        if (logStatus === 'notLog')
            router.replace({pathname: '/Login', query: {next: '/Payment/information'}}, '/Login')
    }, [])
    const formik = useFormik({
        initialValues: {
            firstName: remember ? first_name || '' : '',
            lastName: remember ? last_name || '' : '',
            address: remember ? address || '' : '',
            postalNumber: undefined,
            phoneNumber: remember ? phone || '' : ''
        } as formValues,
        validationSchema: InformationSchema,
        onSubmit: values => {
            dispatch(saveOrderSendTime(new Date))
            sendAddressData({
                name: Date.now().toString(),
                phone: values.postalNumber,
                address: values.address
            })
            sendData({
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phoneNumber,
            })
        },
    });

    const sendAddressData = useCallback(async (values: any) => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/store/address/',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(values)
        }).then(response => response.data)
            .then(result => result)
            .catch(error => error);
        dispatch(alterAddAddress({id: response.id, address: values.address, postalNumber: values.phone}))
        dispatch(saveAddress(response.id))
    }, [])

    const sendData = useCallback(async (values: any) => {
        let status: any = ''
        const response: Promise<AxiosResponse<any>> = await axios({
            method: "put",
            url: 'http://localhost:8000/user/change_user_info/',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(values)
        })
            .then(response => {
                status = response.status;
                return response.data
            })
            .then(result => result)
            .catch(error => error);
        console.log(response)

        if (status === 200) {
            //dispatch save information
            sendOrder();
        } else {
            toast("failed login");
            formik.resetForm()
        }
    }, [dispatch])

    const sendOrder = useCallback(async () => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8000/store/order',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(currentOrder)
        }).then(res => res.data)
            .catch(error => error);
        console.log(response);
    }, [])

    return (
        username &&
        <DefaultLayout>
            <div className='bg-secondary flex items-center justify-center w-full flex-col pb-16'>
                <Head><title>تکمیل خرید</title></Head>
                <BreadcrumbSection options={[]}/>
                <form onSubmit={formik.handleSubmit}
                      className='bg-weef-black border-[1px] border-primary-red flex flex-col z-20 px-4 py-6 gap-3 w-[560px] rounded-lg'>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="firstName" className='w-fit self-start text-weef-white'>نام:</label>
                        <div className='w-full flex justify-end'>
                            <Input
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
                                className='placeholder:text-right'
                                id='address' name='address'
                                about={formik.errors.address}
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                placeholder='آدرس'/>
                        </div>
                    </div>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="postalNumber" className='w-fit self-start text-weef-white'>کد پستی:</label>
                        <div className='w-full flex justify-end'>
                            <Input
                                className='placeholder:text-right'
                                id='postalNumber' name='postalNumber'
                                about={formik.errors.postalNumber}
                                onChange={formik.handleChange}
                                value={formik.values.postalNumber}
                                placeholder='کد پستی'/>
                        </div>
                    </div>
                    <div className='flex flex-col px-4 gap-1'>
                        <label htmlFor="phoneNumber" className='w-fit self-start text-weef-white'>تلفن‌همراه:</label>
                        <div className='w-full flex justify-end'>
                            <Input
                                className='placeholder:text-right'
                                id='phoneNumber' name='phoneNumber'
                                about={formik.errors.phoneNumber}
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                placeholder='تلفن‌همراه'/>
                        </div>
                    </div>
                    <div className='w-fit self-end pt-2 px-4'>
                        <Button type='submit' size='medium'>انتقال به صفحه پرداخت</Button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}

export default PaymentInformation;