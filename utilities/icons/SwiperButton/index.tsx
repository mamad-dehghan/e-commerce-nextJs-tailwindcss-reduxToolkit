import React, {useMemo} from 'react';
import classNames from "classnames";

type props={
    direction: 'right' | 'left',

}

const SwiperButton=({direction}:props)=> {
    const className = useMemo(()=>{
        return classNames(

            direction==='right'?' rotate-180':''
        )
    },[direction])
    return (
        <span className={'group relative cursor-pointer z-10 flex items-center justify-center flex-col w-fit h-fit'}>
            <svg className={'relative top-0   z-10 group-hover:-z-10'+className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="#232227"/>
                <path d="M24 0C10.7664 0 0 10.7664 0 24C0 37.2336 10.7664 48 24 48C37.2336 48 48 37.2336 48 24C48 10.7664 37.2336 0 24 0ZM24 43.2C13.4136 43.2 4.8 34.5864 4.8 24C4.8 13.4136 13.4136 4.8 24 4.8C34.5864 4.8 43.2 13.4136 43.2 24C43.2 34.5864 34.5864 43.2 24 43.2Z" fill="url(#paint0_linear_66_3316)"/>
                <path d="M26.8229 10L14 24L26.8229 38L30 34.5313L20.3542 24L30 13.4687L26.8229 10Z" fill="url(#paint1_linear_66_3316)"/>
                <defs>
                    <linearGradient id="paint0_linear_66_3316" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF626D"/>
                        <stop offset="1" stopColor="#FCAD72"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_66_3316" x1="14" y1="24" x2="30" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF626D"/>
                        <stop offset="1" stopColor="#FCAD72"/>
                    </linearGradient>
                </defs>
            </svg>

            <svg className={'absolute top-0 ' +className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z" fill="url(#paint0_linear_66_3315)"/>
                <path d="M24 0C10.7664 0 0 10.7664 0 24C0 37.2336 10.7664 48 24 48C37.2336 48 48 37.2336 48 24C48 10.7664 37.2336 0 24 0ZM24 43.2C13.4136 43.2 4.8 34.5864 4.8 24C4.8 13.4136 13.4136 4.8 24 4.8C34.5864 4.8 43.2 13.4136 43.2 24C43.2 34.5864 34.5864 43.2 24 43.2Z" fill="#232227"/>
                <path d="M26.8229 10L14 24L26.8229 38L30 34.5313L20.3542 24L30 13.4687L26.8229 10Z" fill="#232227"/>
                <defs>
                    <linearGradient id="paint0_linear_66_3315" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF626D"/>
                        <stop offset="1" stopColor="#FCAD72"/>
                    </linearGradient>
                </defs>
            </svg>

        </span>
    );
}

export default SwiperButton;