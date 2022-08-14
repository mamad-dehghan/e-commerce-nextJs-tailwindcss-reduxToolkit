import React from 'react';
import SolidBackground from "../utilities/background/SolidBackground";
import AlertItem from "../components/costum/AlertItem";
import Head from 'next/head';


const _404 = () => {
    return (
        <div className='w-full h-screen bg-secondary'>
            <Head>
                <title>صفحه مورد نظر یافت نشد</title>
            </Head>
            <SolidBackground/>
            <div className='flex flex-col gap-2 justify-center items-center h-full w-full pb-16'>
                <div className='flex pb-16'>
                    <div
                        className='w-20 sm:w-32 h-20 sm:h-32 rotate-45 from-primary-red to-primary-orange bg-gradient-to-tr p-[1px] flex items-center justify-center z-20'>
                            <span
                                className='w-full h-full bg-weef-black flex items-center justify-center'>
                                <span className='-rotate-45 text-weef-white text-5xl sm:text-6xl'>4</span>
                            </span>
                    </div>
                    <div
                        className='w-20 sm:w-32 h-20 sm:h-32 rotate-45 from-primary-red to-primary-orange bg-gradient-to-tr p-[1px] flex items-center justify-center z-30'>
                            <span
                                className='w-full h-full bg-weef-black flex items-center justify-center'>
                                <span className='-rotate-45 text-weef-white text-5xl sm:text-6xl'>0</span>
                            </span>
                    </div>
                    <div
                        className='w-20 sm:w-32 h-20 sm:h-32 rotate-45 from-primary-red to-primary-orange bg-gradient-to-tr p-[1px] flex items-center justify-center z-20'>
                            <span
                                className='w-full h-full bg-weef-black flex items-center justify-center'>
                                <span className='-rotate-45 text-weef-white text-5xl sm:text-6xl'>4</span>
                            </span>
                    </div>
                </div>
                <AlertItem text={'متاسفانه صفحه مورد نظر یافت نشد'}/>
                <AlertItem text={'بازگشت به صفحه اصلی'} link={'/'}/>
            </div>
        </div>
    );
}

export default _404;