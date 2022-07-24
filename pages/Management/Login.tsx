import React from 'react';
import WaveBackground from "../../utilities/background/WaveBackground";
import WeefIcon from "../../utilities/icons/Weef";
import Input from "../../components/common/Input";
import Button from '../../components/common/Button';


const ManagementLogin = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center bg-secondary'>
            <div
                className='flex flex-col items-stretch px-4 py-6 gap-3 bg-weef-black border z-20 border-primary-red rounded-lg w-[560px]'>
                <div className='flex py-2 px-4 items-center justify-between '>
                    <div className='text-weef-white text-[24px] px-2 font-medium'>پنل مدیریت</div>
                    <div className='flex items-center gap-2 px-4 py-2'>
                        <span className='text-weef-secondary-light font-[RubikWetPaint] font-normal text-lg'>WEEF group</span>
                        <WeefIcon size='medium' background='transparent' fill='secondary'/>
                    </div>
                </div>
                <div className='flex flex-col px-4'>
                    <label htmlFor="email" className='text-lg text-weef-white'>ایمیل:</label>
                    <div className='w-fit self-end'>
                        <Input placeholder='email' id='email'/>
                    </div>
                </div>
                <div className='flex flex-col px-4'>
                    <label htmlFor="password" className='text-lg text-weef-white'>رمز ورود:</label>
                    <div className='w-fit self-end'>
                        <Input placeholder='password' id='password'/>
                    </div>
                </div>
                <div className='flex items-center gap-1 px-4'>
                    <span className='text-weef-white'>من را به خاطر بسپار</span>
                    <input type="checkbox" style={{accentColor:'#FF626D'}} name="rememberMe" id="rememberMe"/>
                </div>
                <div className='w-fit px-4 self-end'>
                    <Button size='medium'>ورود</Button>
                </div>
            </div>
            <WaveBackground/>
        </div>
    );
}

export default ManagementLogin;