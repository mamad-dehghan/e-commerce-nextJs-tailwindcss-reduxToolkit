import React from 'react';
import WeefIcon from "../../utilities/icons/Weef";
import BasketIcon from "../../utilities/icons/Basket";
import Link from "next/link";
import SearchInput from "../../components/common/SearchInput";

function Header() {
    return (
        <div className='w-full bg-weef-black flex flex-col '>
            <div className='Container grow flex items-center justify-between px-8 py-2'>
                <div className='flex items-center gap-4'>
                    <Link href='/Basket'>
                        <a><BasketIcon/></a>
                    </Link>
                    <SearchInput dir='rtl'  placeholder='جست‌وجو بین محصولات ...'/>
                </div>
                <div className='flex flex-row  gap-4'>
                    <Link href='/'><a className='link font-normal'>خانه</a></Link>
                    <Link href='/Basket'><a className='link font-medium'>داشبورد</a></Link>
                    <Link href='/Login'><a className='link'>پنل مدیریت</a></Link>
                    <Link href='/Signin'><a className='link'>وبلاگ</a></Link>
                </div>
                <div>
                    <WeefIcon background='primary' fill='black'/>
                </div>
            </div>
        </div>
    );
}

export default Header;