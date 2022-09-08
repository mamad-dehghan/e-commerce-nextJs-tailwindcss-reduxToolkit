import React, {useEffect, useState} from 'react';
import DefaultLayout from "../../layouts/DefaultLayout";
import Head from "next/head";
import {useCookies} from "react-cookie";
import {checkLogin} from "../../utilities/functions/ApiCall/login";
import Input from "../../components/common/Input";
import AlertItem from "../../components/costum/AlertItem";

const Dashboard = () => {
    const [cookies] = useCookies(['token']);
    const [userInformation, setUserInformation] = useState<any>(undefined);

    useEffect(() => {
        cookies.token && checkLogin(cookies.token)
            .then(res => {
                const [isLogin, response]: any = res;
                if (isLogin)
                    setUserInformation(response)
            })
    }, [])
    console.log('Dashboard')
    return (
        <>
            <div className='flex flex-col w-full grow'>
                <Head><title>Dashboard</title></Head>
                {
                    userInformation ?
                        <div className='h-fit w-full p-8 bg-secondary flex items-stretch rounded-t-lg grow'>
                            <div className='w-1/2 min-w-[480px] h-full flex flex-col items-stretch justify-start gap-2'>
                                <div className='flex px-4 justify-between items-start'>
                                    <label htmlFor="username" className='text-weef-white whitespace-nowrap'>نام
                                        کاربری:</label>
                                    <div className='w-[320px]'>
                                    <Input value={userInformation.username || ''} disabled={true} type="text" id='username' widthOnPercent={100}
                                           className='h-9 bg-weef-secondary-light'/>
                                    </div>
                                </div>
                                <div className='flex px-4 justify-between items-center'>
                                    <label htmlFor="firstName" className='text-weef-white whitespace-nowrap'>نام:</label>
                                    <div className='w-[320px]'>
                                    <Input value={userInformation.first_name || ''} disabled={true} type="text" id='firstName' widthOnPercent={100}
                                           className='h-9 bg-weef-secondary-light'/>
                                </div>
                                </div>
                                <div className='flex px-4 justify-between items-center'>
                                    <label htmlFor="lastName"
                                           className='text-weef-white whitespace-nowrap'>نام‌خانوادگی:</label>
                                    <div className='w-[320px]'>
                                    <Input value={userInformation.last_name || ''} disabled={true} type="text" id='lastName' widthOnPercent={100}
                                           className='h-9 bg-weef-secondary-light'/>
                                </div>
                                </div>
                                <div className='flex px-4 justify-between items-center'>
                                    <label htmlFor="email"
                                           className='text-weef-white whitespace-nowrap'>ایمیل:</label>
                                    <div className='w-[320px]'>
                                    <Input value={userInformation.email || ''} disabled={true} type="text" id='email' widthOnPercent={100}
                                           className='h-9 bg-weef-secondary-light'/>
                                </div>
                                </div>
                                <div className='flex px-4 justify-between items-center'>
                                    <label htmlFor="phone"
                                           className='text-weef-white whitespace-nowrap'>تلفن‌همراه:</label>
                                    <div className='w-[320px]'>
                                    <Input value={userInformation.phone || ''} disabled={true} type="text" id='phone' widthOnPercent={100}
                                           className='h-9 bg-weef-secondary-light'/>
                                </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex items-center justify-center flex-col gap-2 grow'>
                            <AlertItem text='ابتدا باید وارد شوید'/>
                            <AlertItem text='ورود' link='/Login'/>
                            <AlertItem text='ثبت‌نام' link='/Signin'/>
                        </div>
                }
            </div>
        </>
    );
}

Dashboard.getLayout = function getLayout(page: any) {
    return (
        <DefaultLayout>
            {page}
        </DefaultLayout>
    )
}

export default Dashboard;