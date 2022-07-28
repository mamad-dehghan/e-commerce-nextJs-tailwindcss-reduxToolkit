import React from 'react';
import WeefIcon from "../../utilities/icons/Weef";
import Facebook from "../../utilities/icons/FaceBook";
import Twitter from "../../utilities/icons/Twitter";
import Instagram from "../../utilities/icons/Instagram";
import Linkedin from "../../utilities/icons/Linkedin";
import Link from 'next/link';

function Footer() {
    return (
        <div className='w-full bg-secondary flex border-t border-t-weef-black'>
            <div className='Container grow flex flex-col items-stretch justify-start px-8'>
                <div className='py-4'>
                    <p className='text-weef-white text-right font-extralight text-sm'>مجموعه ویف همواره در نظر داشته تا با کیفیت‌ترین کالاهای حوزه مربوط به خود را از بهترین برندهای ایرانی و خارجی، در اختیار مشتریان خود قرار دهد.</p>
                </div>
                <div className='flex flex-row gap-4 py-4 px-6  border-y border-y-weef-black'>
                    <div className='flex flex-col items-start justify-start w-1/5 text-weef-white'>
                        <div className='py-3'>همکاری با ما</div>
                        <div className='py-1.5 text-sm font-light hover:link'>فروش محصول</div>
                        <div className='py-1.5 text-sm font-light hover:link'>ثبت نمایندگی</div>
                        <div className='py-1.5 text-sm font-light hover:link'>تبلیغات</div>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/5 text-weef-white'>
                        <div className='py-3'>درباره ما</div>
                        <div className='py-1.5 text-sm font-light hover:link'>وبلاگ</div>
                        <div className='py-1.5 text-sm font-light hover:link'>خدمات ما</div>
                        <div className='py-1.5 text-sm font-light hover:link'>ویف در گذر زمان</div>
                    </div>
                    <div className='flex flex-col items-start justify-start w-1/5 text-weef-white'>
                        <div className='py-3'>پشتیبانی</div>
                        <div className='py-1.5 text-sm font-light hover:link'>تماس با پشتیبان</div>
                        <div className='py-1.5 text-sm font-light hover:link'>ارتباط با ما</div>
                        <div className='py-1.5 text-sm font-light hover:link'>انتقادات و پیشنهادات</div>
                    </div>
                    <div className='flex flex-col items-center justify-start w-1/5 text-weef-white'>
                        <div className='py-3'>ویف در شبکه‌های اجتماعی</div>
                        <div className='flex items-center justify-center gap-4'>
                            <Link href='#'><a><Facebook className='cursor-pointer'/></a></Link>
                            <Link href='#'><a><Twitter  className='cursor-pointer'/></a></Link>
                            <Link href='#'><a><Linkedin  className='cursor-pointer'/></a></Link>
                            <Link href='#'><a><Instagram  className='cursor-pointer'/></a></Link>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center w-1/5 text-weef-white'>
                        <div><WeefIcon size='large' fill={"white"} background={'transparent'}/></div>
                        <div className='font-[RubikWetPaint] text-[24px] text-center'>WEEF group</div>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-between px-40 py-4'>
                    <span className='link text-xs'>Privacy Policy</span>
                    <span className='text-weef-white text-xs'><bdi>{'\u24B8'} 2022  Allright reserved</bdi></span>
                </div>
            </div>
        </div>
    );
}

export default Footer;