import React, {useCallback} from 'react';
import WaveBackground from "../../utilities/background/WaveBackground";
import WeefIcon from "../../utilities/icons/Weef";
import Input from "../../components/common/Input";
import Button from '../../components/common/Button';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {tryLoginType} from "../../redux/slices/AuthenticationSlice";
import axios from "axios";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import Head from "next/head";
import {useCookies} from "react-cookie";
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

const initialValues = {
    username: '',
    password: ''
}

const ManagementLogin = () => {
    const [cookies, setCookie] = useCookies(['token']);
    // const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        initialValues,
        validationSchema: LoginSchema,
        onSubmit: values => {
            sendData(values);
        },
    });

    console.log(cookies.token)

    const sendData = useCallback(async (values: tryLoginType) => {
        let status: any = ''
        const response: ISuccessLogin | IFailedLogin = await axios.post('http://localhost:8000/user/login/',
            values)
            .then(res => {
                status = res.status
                return res.data
            })
            .catch(error => {
                status = error.status
                return error
            })

        console.log(response)

        if (status === 200) {
            // @ts-ignore
            if (response.is_superuser) {
                // @ts-ignore
                setCookie('token', response.token, {path: '/'});
                if (router.query.next !== undefined)
                    router.replace(`${router.query.next}`);
                else
                    router.push('/Management')
            }
        } else {
            toast("failed login");
            formik.resetForm()
        }
    }, [])

    return (
        <div className='w-full h-screen flex items-center justify-center bg-secondary'>
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
                            disabled={formik.isSubmitting}
                            about={formik.errors.password}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            id='password' name='password'
                            placeholder='password'/>
                    </div>
                </div>
                <div className='flex items-center gap-1 px-4'>
                    <span className='text-weef-white'>من را به خاطر بسپار</span>
                    <input type="checkbox" style={{accentColor: '#FF626D'}} name="rememberMe" id="rememberMe"/>
                </div>
                <div className='w-fit px-4 self-end'>
                    <Button type='submit' size='medium'>ورود</Button>
                </div>
            </form>
            <WaveBackground/>
        </div>
    );
}

export default ManagementLogin;