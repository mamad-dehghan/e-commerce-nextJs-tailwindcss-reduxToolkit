import React, {useLayoutEffect, useState} from 'react';
import WeefIcon from "../../utilities/icons/Weef";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import WaveBackground from "../../utilities/background/WaveBackground";
import Link from "next/link";
import Head from "next/head";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useRouter} from "next/router";
import {checkLogin, tryToLogin} from "../../utilities/functions/ApiCall/login";
import {useCookies} from "react-cookie";
import {toast} from 'react-toastify';

type formValuesType = {
    username: string,
    password: string
}

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'نام‌کاربری معتبر نیست')
        .max(150, 'نام‌کاربری معتبر نیست')
        .required('نام‌کاربری ضروری است'),
    password: Yup.string()
        .min(5, 'رمز عبور معتبر نیست')
        .max(150, 'رمز عبور معتبر نیست')
        .required('رمز عبور ضروری است')
});

const Login = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [rememberMeCookie, setRemember] = useCookies<string>(['rememberMe']);
    const [rememberMe, setRememberMe] = useState<boolean>(rememberMeCookie.rememberMe === "true");
    const [initialFormValues, setInitialFormValues] = useState<formValuesType>({username: '', password: ''});
    const router = useRouter();

    useLayoutEffect(() => {
        if (rememberMeCookie.rememberMe) {
            checkLogin(cookies.token)
                .then((res) => {
                    const [status, response]: any = res;
                    if (status)
                        setInitialFormValues({
                            username: response.username,
                            password: ''
                        })
                    else
                        removeCookie("token");
                })
        }
    }, [])

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: LoginSchema,
        enableReinitialize: true,
        onSubmit: values => {
            setRemember('rememberMe', rememberMe, {path: '/'});

            tryToLogin(values)
                .then(([status, response]) => {
                    if (status === 200) {
                        toast.success("ورود با موفقیت");
                        setCookie('token', response.token, {path: '/'});
                        if (router.query.next !== undefined)
                            router.replace(`${router.query.next}`);
                        else
                            router.push('/Dashboard');
                    } else {
                        removeCookie("token");
                        toast.error("کاربری با این مشخصات یافت نشد");
                        formik.resetForm();
                    }
                })
        },
    });

    return (
        <div className='w-full h-screen flex items-center justify-center bg-secondary overflow-hidden'>
            <Head>
                <title>صفحه ورود</title>
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
                    <label htmlFor="username" className='text-weef-white'>نام کاربری:</label>
                    <div className='w-full flex justify-end'>
                        <Input
                            widthOnPercent={68}
                            type='text'
                            disabled={formik.isSubmitting}
                            className='placeholder:text-right'
                            id='username' name='username'
                            about={formik.errors.username}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            placeholder='نام کاربری'/>
                    </div>
                </div>
                <div className='flex flex-col px-4 gap-1'>
                    <label htmlFor="password" className='text-weef-white'>رمز ورود:</label>
                    <div className='w-full flex justify-end'>
                        <Input
                            widthOnPercent={68}
                            type='password'
                            disabled={formik.isSubmitting}
                            className='placeholder:text-right'
                            id='password' name='password'
                            about={formik.errors.password}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder='رمز ورود'/>
                    </div>
                </div>
                <div className='flex items-center gap-1 px-4'>
                    <label htmlFor='rememberMe' className='text-weef-white cursor-pointer'>من را به خاطر بسپار</label>
                    <input checked={rememberMe}
                           disabled={formik.isSubmitting}
                           onChange={(e) => setRememberMe(e.target.checked)}
                           type="checkbox" className='cursor-pointer accent-primary-red'
                           name="rememberMe" id="rememberMe"/>
                </div>
                <div className='w-fit px-4 self-end'>
                    <Button disable={!formik.isValid} type='submit' size='medium'>ورود</Button>
                </div>
                <div className='flex justify-between items-center w-full px-4 pt-2'>
                    <Link href='/Login/ResetPassword'>
                        <a className='link'>رمز خود را فراموش کرده‌ام</a>
                    </Link>
                    <Link href='/Signin'>
                        <a className='link'>ساخت حساب کاربری</a>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;