import React from 'react';
import RotatedButton from "../../../common/RotatedButton";
import Link from "next/link";
import {useRouter} from "next/router";

const NavigationBar = () => {
    const router = useRouter()
    console.log(router.asPath)
    return (
        <div className='absolute right-8 top-20 flex flex-col justify-start items-start pr-6'>
            <Link href={(router.asPath === '/Management/Products') ? '' : '/Management/Products'}><a>
                <RotatedButton heightOnPx={146} background='linear'
                               className='shrink-0 z-30 hover:z-20'>کالاها</RotatedButton>
            </a></Link>
            <Link href={(router.asPath === '/Management/Store') ? '' : '/Management/Store'}><a>
                <RotatedButton heightOnPx={146} background='linear' className='shrink-0 z-10 hover:z-20'>
                    <span className='text-center'>موجودی و قیمت</span>
                </RotatedButton>
            </a></Link>
            <Link href={(router.asPath === '/Management/Orders') ? '' : '/Management/Orders'}><a>
                <RotatedButton heightOnPx={146} background='linear'
                               className='shrink-0 z-10 hover:z-20'>سفارش‌ها</RotatedButton>
            </a></Link>
        </div>
    );
}

export default React.memo(NavigationBar);