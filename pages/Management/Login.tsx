import React from 'react';
import WaveBackground from "../../utilities/background/WaveBackground";
import WeefIcon from "../../utilities/icons/Weef";
import Input from "../../components/common/Input";
import Button from '../../components/common/Button';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useRouter} from "next/router";
import Head from "next/head";
import {useCookies} from "react-cookie";
import {tryToLogin} from "../../utilities/functions/ApiCall/login";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

const initialValues = {
    username: '',
    password: ''
}

const ManagementLogin = () => {
    const router = useRouter();
    const [, setCookie, removeCookie] = useCookies(['token']);

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: values => {
            tryToLogin(values)
                .then(([status, response]) => {
                    if (status === 200) {
                        if (response.userInfo.is_superuser) {
                            setCookie('token', response.token, {path: '/'});
                            if (router.query.next !== undefined)
                                router.replace(`${router.query.next}`);
                            else
                                router.push('/Management');
                        } else {
                            toast("شما امکان ورود به این قسمت را ندارید");
                        }
                    } else {
                        removeCookie("token");
                        toast("کاربری با این مشخصات یافت نشد");
                        formik.resetForm();
                    }
                })
        },
    });

    return (
        <div className='w-full h-screen flex items-center justify-center bg-secondary'>
            <WaveBackground/>
            <Head><title>ورود مدیریت</title></Head>
            <form
                onSubmit={formik.handleSubmit}
                className='flex flex-col items-stretch px-4 py-6 gap-3 bg-weef-black border z-20 border-primary-red rounded-lg w-[560px]'>
                <div className='flex py-2 px-4 items-center justify-between '>
                    <div className='text-weef-white text-[24px] px-2 font-medium'>پنل مدیریت</div>
                    <div className='flex items-center gap-2 px-4 py-2'>
                        <span
                            className='text-weef-secondary-light font-[RubikWetPaint] font-normal text-lg'>WEEF group</span>
                        <WeefIcon size='medium' background='transparent' fill='secondary'/>
                    </div>
                </div>
                <div className='flex flex-col px-4'>
                    <label htmlFor="username" className='text-lg text-weef-white'>نام‌کاربری:</label>
                    <div className='w-fit self-end'>
                        <Input
                            type='text'
                            disabled={formik.isSubmitting}
                            about={formik.errors.username}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            name='username' id='username'
                            placeholder='username'/>
                    </div>
                </div>
                <div className='flex flex-col px-4'>
                    <label htmlFor="password" className='text-lg text-weef-white'>رمز ورود:</label>
                    <div className='w-fit self-end'>
                        <Input
                            type='password'
                            disabled={formik.isSubmitting}
                            about={formik.errors.password}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            id='password' name='password'
                            placeholder='password'/>
                    </div>
                </div>
                <div className='w-fit px-4 self-end'>
                    <Button type='submit' size='medium'>ورود</Button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default ManagementLogin;