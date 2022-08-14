import React from 'react';
import WeefIcon from "../../utilities/icons/Weef";
import Link from "next/link";
import BasketButton from "../../components/common/BasketButton";
import HeaderSearch from "../../components/costum/HeaderSearch";

const Header = () => {
    return (
        <div className='w-full bg-weef-black flex sticky top-0 z-50'>
            <div className='Container grow flex items-center justify-between px-8 py-2'>
                <div className='flex items-center gap-4'>
                    <Link href='/Basket'>
                        <a><BasketButton/></a>
                    </Link>
                    <HeaderSearch/>
                </div>
                <div className='flex flex-row gap-4'>
                    <Link href='/'><a className='link font-normal'>خانه</a></Link>
                    <Link href='/Dashboard'><a className='link font-medium'>داشبورد</a></Link>
                    <Link href='/Management/Login'><a className='link font-medium'>پنل مدیریت</a></Link>
                    <Link href='/Login'><a className='link font-medium'>وبلاگ</a></Link>
                </div>
                <div className='flex items-center gap-2'>
                    <span
                        className='text-transparent bg-clip-text bg-primary font-[RubikWetPaint] text-lg'>WEEF group</span>
                    <WeefIcon background='primary' fill='black'/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Header);