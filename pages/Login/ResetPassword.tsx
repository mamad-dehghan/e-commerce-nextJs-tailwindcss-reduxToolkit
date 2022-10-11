import React from 'react';
import WaveBackground from "../../layouts/WaveBackground/WaveBackground";
import WeefIcon from "../../utilities/icons/Weef";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Link from "next/link";
import Head from "next/head";
import {useFormik} from "formik";
import * as Yup from "yup";
import DefaultLayout from "../../layouts/DefaultLayout";


const LoginSchema = Yup.object().shape({
    userName: Yup.string()
        .min(4, 'نام‌کاربری معتبر نیست')
        .max(150, 'نام‌کاربری معتبر نیست')
        .required('نام‌کاربری ضروری است'),
    phoneNumber: Yup.string()
        .matches(/^[+0123456789]+$/, 'تلفن‌همراه معتبر نیست')
        .min(11, 'تلفن‌همراه معتبر نیست')
        .max(13, 'تلفن‌همراه معتبر نیست')
        .required('تلفن‌همراه ضروری است'),
});


const ResetPassword = () => {
    console.log('ResetPassword')
    const formik = useFormik({
        initialValues: {
            userName: '',
            phoneNumber: ''
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <Head>
                <title>صفحه بازیابی رمز عبور</title>
            </Head>
            <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col items-stretch px-4 py-6 gap-3 bg-weef-black border z-20 border-primary-red rounded-lg w-[560px]'>
                <div className='flex py-2 px-4 items-center justify-center '>
                    <div className='flex items-center gap-2 px-4 py-2'>
                        <span
                            className='text-weef-secondary-light font-[RubikWetPaint] font-normal text-lg'>WEEF group</span>
                        <WeefIcon size='medium' background='transparent' fill='secondary'/>
                    </div>
                </div>
                <div className='flex flex-col px-4 gap-1'>
                    <label htmlFor="userName" className='text-weef-white'>نام کاربری:</label>
                    <div className='w-full flex justify-end'>
                        <Input
                            widthOnPercent={68}
                            disabled={formik.isSubmitting}
                            className='placeholder:text-right'
                            id='userName' name='userName'
                            about={formik.errors.userName}
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            placeholder='نام کاربری'/>
                    </div>
                </div>
                <div className='flex flex-col px-4 gap-1'>
                    <label htmlFor="phoneNumber" className='text-weef-white'>شماره تلفن:</label>
                    <div className='w-full flex justify-end'>
                        <Input
                            widthOnPercent={68}
                            disabled={formik.isSubmitting}
                            className='placeholder:text-right'
                            id='phoneNumber' name='phoneNumber'
                            about={formik.errors.phoneNumber}
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                            placeholder='شماره تلفن'/>
                    </div>
                </div>
                <div className='w-fit px-4 self-end'>
                    <Button disable={!formik.isValid} type='submit' size='medium'>ارسال کد بازیابی</Button>
                </div>
                <div className='w-fit px-4'>
                    <Link href='/Login'>
                        <a className='link'>بازگشت به صفحه ورود</a>
                    </Link>
                </div>
                <div className='w-fit px-4 pt-2'>
                    <Link href='/'>
                        <a className='link'>بازگشت به صفحه اصلی</a>
                    </Link>
                </div>
            </form>
        </>
    );
}
ResetPassword.getLayout = function getLayout(page: any) {
    return (
        <WaveBackground>
            {page}
        </WaveBackground>
    )
}
export default ResetPassword;