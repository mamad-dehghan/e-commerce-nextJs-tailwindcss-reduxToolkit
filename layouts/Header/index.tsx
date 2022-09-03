import React from 'react';
import WeefIcon from "../../utilities/icons/Weef";
import Link from "next/link";
import BasketButton from "../../components/common/BasketButton";
import HeaderSearch from "../../components/costum/HeaderSearch";

const Header = () => {
    console.log('Header')
    return (
        <div className='w-full bg-weef-black flex sticky top-0 z-50'>
            <div className='Container grow flex items-center justify-between'>
                <div className='w-full flex items-center justify-between py-2 px-6'>
                    <div className='hidden md:flex items-center gap-4'>
                        <HeaderSearch/>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <Link href='/'><a className='link font-normal'>خانه</a></Link>
                        <Link href='/Dashboard'><a className='link font-medium'>داشبورد</a></Link>
                        <Link href='/Management/Login'><a className='link font-medium'>پنل مدیریت</a></Link>
                        <Link href='/Login'><a className='link font-medium'>ورود</a></Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-center rounded-full'>
                            <Link href='/Basket'>
                                <a><BasketButton/></a>
                            </Link>
                        </div>
                        <WeefIcon background='primary' fill='black'/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default React.memo(Header, () => true);