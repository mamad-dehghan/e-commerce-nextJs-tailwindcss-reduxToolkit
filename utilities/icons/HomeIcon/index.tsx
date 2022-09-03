import React from 'react';
import {Colors} from "../../constants/colors";
import {useRouter} from "next/router";

const HomeIcon = () => {
    const router = useRouter()
    return (
        <div className='group relative overflow-hidden rounded-full cursor-pointer' onClick={() => router.push('/')}>
            <svg width="56" height="56" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="36" r="35.5" fill="url(#paint0_linear_66_3167)" stroke={Colors._black}/>
                <path
                    d="M52.8 60H19.2C18.5635 60 17.953 59.7279 17.5029 59.2436C17.0529 58.7593 16.8 58.1024 16.8 57.4175V36.7571H12L34.3008 12.7574C34.5237 12.5173 34.7884 12.3268 35.0797 12.1969C35.3711 12.0669 35.6834 12 35.9988 12C36.3142 12 36.6265 12.0669 36.9179 12.1969C37.2092 12.3268 37.4739 12.5173 37.6968 12.7574L60 36.7571H55.2V57.4175C55.2 58.1024 54.9471 58.7593 54.4971 59.2436C54.047 59.7279 53.4365 60 52.8 60ZM31.2 41.9222H40.8V54.8349H50.4V33.7303L36 18.235L21.6 33.7303V54.8349H31.2V41.9222Z"
                    fill={Colors._black}/>
                <defs>
                    <linearGradient id="paint0_linear_66_3167" x1="0" y1="36" x2="72" y2="36"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor={Colors._primary_red}/>
                        <stop offset="1" stopColor={Colors._primary_orange}/>
                    </linearGradient>
                </defs>
            </svg>

            <svg className='group-hover:opacity-0 absolute top-0 left-0 z-10' width="56" height="56"
                 viewBox="0 0 72 72"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="36" r="35.5" fill={Colors._black} stroke="url(#paint0_linear_66_3166)"/>
                <path
                    d="M52.8 60H19.2C18.5635 60 17.953 59.7279 17.5029 59.2436C17.0529 58.7593 16.8 58.1024 16.8 57.4175V36.7571H12L34.3008 12.7574C34.5237 12.5173 34.7884 12.3268 35.0797 12.1969C35.3711 12.0669 35.6834 12 35.9988 12C36.3142 12 36.6265 12.0669 36.9179 12.1969C37.2092 12.3268 37.4739 12.5173 37.6968 12.7574L60 36.7571H55.2V57.4175C55.2 58.1024 54.9471 58.7593 54.4971 59.2436C54.047 59.7279 53.4365 60 52.8 60ZM31.2 41.9222H40.8V54.8349H50.4V33.7303L36 18.235L21.6 33.7303V54.8349H31.2V41.9222Z"
                    fill="url(#paint1_linear_66_3166)"/>
                <defs>
                    <linearGradient id="paint0_linear_66_3166" x1="0" y1="36" x2="72" y2="36"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor={Colors._primary_red}/>
                        <stop offset="1" stopColor={Colors._primary_orange}/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_66_3166" x1="12" y1="36" x2="60" y2="36"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor={Colors._primary_red}/>
                        <stop offset="1" stopColor={Colors._primary_orange}/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export default React.memo(HomeIcon);