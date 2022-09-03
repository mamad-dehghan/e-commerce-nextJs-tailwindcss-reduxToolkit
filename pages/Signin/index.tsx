import React, {useCallback, useState} from 'react';
import Head from "next/head";
import WaveBackground from "../../utilities/background/WaveBackground";
import WeefIcon from "../../utilities/icons/Weef";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Link from "next/link";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {router} from "next/client";
import {useCookies} from "react-cookie";
import {trySignIn} from "../../utilities/functions/ApiCall/signin";
import {toast} from "react-toastify";

interface formValues {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const initialValues: formValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInSchema = Yup.object().shape({
    userName: Yup.string()
        .min(4, 'نام‌کاربری کوتاه است')
        .max(150, 'نام‌کاربری طولانی است')
        .required('نام‌کاربری ضروری است'),
    password: Yup.string()
        .min(5, 'رمز عبور کوتاه است')
        .max(150, 'رمز عبور طولانی است')
        .required('رمز عبور ضروری است'),
    confirmPassword: Yup.string()
        .required('رمز عبور ضروری است')
        .oneOf([Yup.ref('password'), null], 'رمز عبور مطابقت ندارد'),
    email: Yup.string().email('ایمیل معتبر نیست').required('ایمیل ضروری است'),
});


const SignIn = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [, setRememberMeCookie] = useCookies<string>(['rememberMe']);
    const formik = useFormik({
        initialValues,
        validationSchema: SignInSchema,
        onSubmit: values => {
            sendData({
                username: values.userName,
                password: values.password,
                email: values.email,
            });
        },
    });

    const sendData = useCallback((values: any) => {
        trySignIn(values)
            .then(isValid => {
                console.log(isValid)
                if (isValid) {
                    toast.success("ثبت‌نام با موفقیت انجام شد");
                    setRememberMeCookie('rememberMe', rememberMe, {path: '/'});
                    router.back()
                } else {
                    toast.error("این نام‌کاربری قبلا انتخاب شده");
                    formik.resetForm({values: {...values, password: '', confirmPassword: ''}})
                }
            })
    }, [])

    return (
        <div className='w-full h-screen flex items-center justify-center bg-secondary'>
            <Head>
                <title>ثبت‌نام</title>
            </Head>
            <WaveBackground/>
            <form onSubmit={formik.handleSubmit}
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
                    <label htmlFor="email" className='text-weef-white'>ایمیل:</label>
                    <div className='w-full flex justify-end'>
                        <Input
                            widthOnPercent={68}
                            disabled={formik.isSubmitting}
                            className='placeholder:text-right'
                            id='email' name='email'
                            about={formik.errors.email}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder='ایمیل'/>
                    </div>
                </div>
                <div className='flex flex-col px-4 gap-1'>
                    <label htmlFor="password" className='text-weef-white'>رمز ورود:</label>
                    <div className='w-full flex justify-end'>
                        <Input
                            widthOnPercent={68}
                            disabled={formik.isSubmitting}
                            type='password'
                            className='placeholder:text-right'
                            id='password' name='password'
                            about={formik.errors.password}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder='رمز ورود'/>
                    </div>
                </div>
                <div className='flex flex-col px-4 gap-1'>
                    <label htmlFor="confirmPassword" className='text-weef-white'>تکرار رمز ورود:</label>
                    <div className='w-full flex justify-end'>
                        <Input
                            widthOnPercent={68}
                            disabled={formik.isSubmitting}
                            type='password'
                            className='placeholder:text-right'
                            id='confirmPassword' name='confirmPassword'
                            about={formik.errors.confirmPassword}
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            placeholder='تکرار رمز ورود'/>
                    </div>
                </div>
                <div className='flex items-center gap-1 px-4'>
                    <label htmlFor='rememberMe' className='text-weef-white cursor-pointer'>من را به خاطر بسپار</label>
                    <input
                        disabled={formik.isSubmitting}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        checked={rememberMe}
                        type="checkbox" className='cursor-pointer accent-primary-red'
                        name="rememberMe" id="rememberMe"/>
                </div>
                <div className='w-fit px-4 self-end'>
                    <Button type='submit' size='medium'>ثبت‌نام</Button>
                </div>
                <div className='flex justify-between items-center w-full px-4 pt-2'>
                    <span className='text-weef-white'>حساب کاربری دارم</span>
                    <Link href='/Login'>
                        <a className='link'>ورود به حساب کاربری</a>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignIn;