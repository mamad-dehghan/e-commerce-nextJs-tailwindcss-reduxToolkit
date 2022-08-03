import React from 'react';

type props = {
    isEmpty:boolean
}

const BasketIcon = ({isEmpty}:props) => {

    return (
        <>
            <div
                className='group rounded-full flex items-center justify-center p-[1px] group-hover:bg-weef-black bg-primary'>
                <div
                    className='rounded-full flex items-center justify-center w-[48px] h-[48px] bg-weef-black group-hover:bg-primary'>
                    <div className='relative'>
                        {isEmpty ?
                            <>
                                <svg className='absolute z-10 group-hover:-z-10 translate-x-1/2 -translate-y-1/2'
                                     width="32" height="32" viewBox="0 0 48 48"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 45C16.6569 45 18 43.6569 18 42C18 40.3431 16.6569 39 15 39C13.3431 39 12 40.3431 12 42C12 43.6569 13.3431 45 15 45Z"
                                        fill="url(#paint0_linear_81_644)"/>
                                    <path
                                        d="M36 45C37.6569 45 39 43.6569 39 42C39 40.3431 37.6569 39 36 39C34.3431 39 33 40.3431 33 42C33 43.6569 34.3431 45 36 45Z"
                                        fill="url(#paint1_linear_81_644)"/>
                                    <path
                                        d="M7.47 4.206C7.40206 3.86608 7.21849 3.56019 6.9505 3.34033C6.6825 3.12047 6.34664 3.00021 6 3H0V6H4.77L10.53 34.794C10.5979 35.1339 10.7815 35.4398 11.0495 35.6597C11.3175 35.8795 11.6534 35.9998 12 36H39V33H13.23L12.03 27H39C39.3412 26.9999 39.6722 26.8835 39.9384 26.67C40.2045 26.4565 40.39 26.1586 40.464 25.8255L43.866 10.5H40.7955L37.797 24H11.43L7.47 4.206Z"
                                        fill="url(#paint2_linear_81_644)"/>
                                    <path
                                        d="M24 0C22.22 0 20.4799 0.527841 18.9999 1.51677C17.5198 2.50571 16.3663 3.91131 15.6851 5.55585C15.0039 7.20038 14.8257 9.00998 15.1729 10.7558C15.5202 12.5016 16.3774 14.1053 17.636 15.364C18.8947 16.6226 20.4984 17.4798 22.2442 17.8271C23.99 18.1743 25.7996 17.9961 27.4442 17.3149C29.0887 16.6337 30.4943 15.4802 31.4832 14.0001C32.4722 12.5201 33 10.78 33 9C32.9972 6.61391 32.0481 4.32633 30.3609 2.63911C28.6737 0.951883 26.3861 0.00277892 24 0V0ZM24 3C25.0677 3.0056 26.114 3.29944 27.0285 3.8505L18.8505 12.0285C18.2995 11.114 18.0057 10.0677 18 9C18.002 7.40931 18.6348 5.88434 19.7596 4.75955C20.8843 3.63476 22.4093 3.00198 24 3V3ZM24 15C22.9323 14.9944 21.886 14.7006 20.9715 14.1495L29.1495 5.9715C29.7005 6.88602 29.9943 7.93234 30 9C29.998 10.5907 29.3652 12.1157 28.2405 13.2404C27.1157 14.3652 25.5907 14.998 24 15V15Z"
                                        fill="url(#paint3_linear_81_644)"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_81_644" x1="12" y1="42" x2="18" y2="42"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF626D"/>
                                            <stop offset="1" stopColor="#FCAD72"/>
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_81_644" x1="33" y1="42" x2="39" y2="42"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF626D"/>
                                            <stop offset="1" stopColor="#FCAD72"/>
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_81_644" x1="0" y1="19.5" x2="43.866" y2="19.5"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF626D"/>
                                            <stop offset="1" stopColor="#FCAD72"/>
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_81_644" x1="15" y1="9" x2="33" y2="9"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF626D"/>
                                            <stop offset="1" stopColor="#FCAD72"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg
                                    className='absolute -z-10 fill-weef-black  group-hover:z-10 translate-x-1/2 -translate-y-1/2'
                                    width="32" height="32"
                                    viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 45C16.6569 45 18 43.6569 18 42C18 40.3431 16.6569 39 15 39C13.3431 39 12 40.3431 12 42C12 43.6569 13.3431 45 15 45Z"/>
                                    <path
                                        d="M36 45C37.6569 45 39 43.6569 39 42C39 40.3431 37.6569 39 36 39C34.3431 39 33 40.3431 33 42C33 43.6569 34.3431 45 36 45Z"/>
                                    <path
                                        d="M7.47 4.206C7.40206 3.86608 7.21849 3.56019 6.9505 3.34033C6.6825 3.12047 6.34664 3.00021 6 3H0V6H4.77L10.53 34.794C10.5979 35.1339 10.7815 35.4398 11.0495 35.6597C11.3175 35.8795 11.6534 35.9998 12 36H39V33H13.23L12.03 27H39C39.3412 26.9999 39.6722 26.8835 39.9384 26.67C40.2045 26.4565 40.39 26.1586 40.464 25.8255L43.866 10.5H40.7955L37.797 24H11.43L7.47 4.206Z"/>
                                    <path
                                        d="M24 0C22.22 0 20.4799 0.527841 18.9999 1.51677C17.5198 2.50571 16.3663 3.91131 15.6851 5.55585C15.0039 7.20038 14.8257 9.00998 15.1729 10.7558C15.5202 12.5016 16.3774 14.1053 17.636 15.364C18.8947 16.6226 20.4984 17.4798 22.2442 17.8271C23.99 18.1743 25.7996 17.9961 27.4442 17.3149C29.0887 16.6337 30.4943 15.4802 31.4832 14.0001C32.4722 12.5201 33 10.78 33 9C32.9972 6.61391 32.0481 4.32633 30.3609 2.63911C28.6737 0.951883 26.3861 0.00277892 24 0V0ZM24 3C25.0677 3.0056 26.114 3.29944 27.0285 3.8505L18.8505 12.0285C18.2995 11.114 18.0057 10.0677 18 9C18.002 7.40931 18.6348 5.88434 19.7596 4.75955C20.8843 3.63476 22.4093 3.00198 24 3V3ZM24 15C22.9323 14.9944 21.886 14.7006 20.9715 14.1495L29.1495 5.9715C29.7005 6.88602 29.9943 7.93234 30 9C29.998 10.5907 29.3652 12.1157 28.2405 13.2404C27.1157 14.3652 25.5907 14.998 24 15V15Z"/>
                                </svg>
                            </>
                            :
                            <>
                                <svg className='absolute z-10 group-hover:-z-10 translate-x-1/2 -translate-y-1/2'
                                     width="32" height="32" viewBox="0 0 48 48"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 45C16.6569 45 18 43.6569 18 42C18 40.3431 16.6569 39 15 39C13.3431 39 12 40.3431 12 42C12 43.6569 13.3431 45 15 45Z"
                                        fill="url(#paint0_linear_81_2362)"/>
                                    <path
                                        d="M36 45C37.6569 45 39 43.6569 39 42C39 40.3431 37.6569 39 36 39C34.3431 39 33 40.3431 33 42C33 43.6569 34.3431 45 36 45Z"
                                        fill="url(#paint1_linear_81_2362)"/>
                                    <path
                                        d="M42 10.5H8.73L7.5 4.2C7.42987 3.85609 7.24136 3.54765 6.96729 3.32839C6.69321 3.10913 6.35092 2.99292 6 3H0V6H4.77L10.5 34.8C10.5701 35.1439 10.7586 35.4523 11.0327 35.6716C11.3068 35.8909 11.6491 36.0071 12 36H39V33H13.23L12 27H39C39.3467 27.0085 39.6857 26.8965 39.9592 26.6832C40.2327 26.4699 40.4238 26.1684 40.5 25.83L43.5 12.33C43.5503 12.1074 43.5491 11.8763 43.4966 11.6543C43.4441 11.4323 43.3416 11.2251 43.1969 11.0487C43.0523 10.8722 42.8693 10.7311 42.6619 10.636C42.4545 10.5409 42.2281 10.4944 42 10.5ZM37.8 24H11.43L9.33 13.5H40.125L37.8 24Z"
                                        fill="url(#paint2_linear_81_2362)"/>
                                    <defs>
                                        <linearGradient id="paint0_linear_81_2362" x1="12" y1="42" x2="18" y2="42"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF626D"/>
                                            <stop offset="1" stopColor="#FCAD72"/>
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_81_2362" x1="33" y1="42" x2="39" y2="42"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF626D"/>
                                            <stop offset="1" stopColor="#FCAD72"/>
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_81_2362" x1="0" y1="19.5" x2="43.5369"
                                                        y2="19.5"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FF626D"/>
                                            <stop offset="1" stopColor="#FCAD72"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <svg
                                    className='absolute -z-10 fill-weef-black  group-hover:z-10 translate-x-1/2 -translate-y-1/2'
                                    width="32" height="32"
                                    viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15 45C16.6569 45 18 43.6569 18 42C18 40.3431 16.6569 39 15 39C13.3431 39 12 40.3431 12 42C12 43.6569 13.3431 45 15 45Z"/>
                                    <path
                                        d="M36 45C37.6569 45 39 43.6569 39 42C39 40.3431 37.6569 39 36 39C34.3431 39 33 40.3431 33 42C33 43.6569 34.3431 45 36 45Z"/>
                                    <path
                                        d="M42 10.5H8.73L7.5 4.2C7.42987 3.85609 7.24136 3.54765 6.96729 3.32839C6.69321 3.10913 6.35092 2.99292 6 3H0V6H4.77L10.5 34.8C10.5701 35.1439 10.7586 35.4523 11.0327 35.6716C11.3068 35.8909 11.6491 36.0071 12 36H39V33H13.23L12 27H39C39.3467 27.0085 39.6857 26.8965 39.9592 26.6832C40.2327 26.4699 40.4238 26.1684 40.5 25.83L43.5 12.33C43.5503 12.1074 43.5491 11.8763 43.4966 11.6543C43.4441 11.4323 43.3416 11.2251 43.1969 11.0487C43.0523 10.8722 42.8693 10.7311 42.6619 10.636C42.4545 10.5409 42.2281 10.4944 42 10.5ZM37.8 24H11.43L9.33 13.5H40.125L37.8 24Z"/>
                                </svg>
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(BasketIcon);