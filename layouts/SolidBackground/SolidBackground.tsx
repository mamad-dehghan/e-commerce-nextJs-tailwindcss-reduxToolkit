import React, {ReactElement} from 'react';

type props = {
    children: ReactElement
}

const SolidBackground = ({children}: props) => {
    console.log('SolidBackground')
    return (
        <div className='w-full h-screen bg-secondary overflow-hidden'>
            <div className='absolute top-0 left-0 w-screen h-screen overflow-hidden'>
                <div
                    className='absolute w-0 h-0 top-0 left-0 border-[7rem] sm:border-[20rem] border-transparent border-r-weef-secondary-light -translate-x-1/2 -translate-y-1/2 rotate-45'/>
                <div
                    className='absolute w-0 h-0 bottom-0 right-0 border-l-weef-secondary-light border-[7rem] sm:border-[20rem] border-transparent border-r-weef-secondary-light translate-x-1/2 translate-y-1/2 rotate-45'/>
                <div
                    className='absolute h-[20rem] sm:h-[30rem] w-[20rem] sm:w-[30rem] top-0 right-0 bg-weef-black translate-x-1/2 -translate-y-1/2 rotate-45 border-[1px] border-primary-red'/>
                <div
                    className='absolute h-[20rem] sm:h-[30rem] w-[20rem] sm:w-[30rem] bottom-0 left-0 bg-weef-black -translate-x-1/2 translate-y-1/2 border-[1px] border-primary-red rotate-45'/>
            </div>
            {children}
        </div>
    );
}

export default SolidBackground;