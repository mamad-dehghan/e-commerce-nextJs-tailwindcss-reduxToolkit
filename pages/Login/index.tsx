import React, {useCallback, useMemo, useState} from 'react';
import WeefIcon from "../../utilities/icons/Weef";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import WaveBackground from "../../utilities/background/WaveBackground";
import Link from "next/link";
import Head from "next/head";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {alterLogin, AuthSliceType, tryLoginType} from "../../redux/slices/AuthenticationSlice";
import axios from "axios";
import {useRouter} from "next/router";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AppDispatch} from "../../redux/store";
import {IFailedLogin, ISuccessLogin} from "../../interfaces/login";

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
    const {username, remember}: AuthSliceType = useSelector((state: any) => state.AuthenticationSlice);
    const [rememberMe, setRememberMe] = useState<boolean>(remember);
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter()

    const initialValues = useMemo(() => {
        if (remember) {
            return {
                username: username || '',
                password: ''
            }
        } else
            return {
                username: '',
                password: ''
            }
    }, [])

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: values => {
            sendData(values);
        },
    });

    const sendData = useCallback(async (values: tryLoginType) => {
        let status: any = ''
        const response: ISuccessLogin | IFailedLogin = await axios.post('http://localhost:8000/user/login/',
            values)
            .then(res => {
                status = res.status;
                return res.data;
            })
            .catch(error => {
                status = error.status;
                return error;
            })
        dispatch(alterLogin({data: response, save: rememberMe}))
        if (status === 200) {
            if (router.query.next !== undefined)
                router.replace(`${router.query.next}`);
            else
                router.push('/Dashboard');
        } else {
            toast("failed login");
            formik.resetForm();
        }
    }, [dispatch, rememberMe])

    return (
        <div className='w-full h-screen flex items-center justify-center bg-secondary'>
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
                    <Button type='submit' size='medium'>ورود</Button>
                </div>
                <div className='w-fit px-4'>
                    <Link href='/Login/ResetPassword'>
                        <a className='link'>رمز خود را فراموش کرده‌ام</a>
                    </Link>
                </div>
                <div className='flex justify-between items-center w-full px-4 pt-2'>
                    <span className='text-weef-white'>در حال حاضر حساب کاربری ندارم</span>
                    <Link href='/Signin'>
                        <a className='link'>ساخت حساب کاربری</a>
                    </Link>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}

export default Login;