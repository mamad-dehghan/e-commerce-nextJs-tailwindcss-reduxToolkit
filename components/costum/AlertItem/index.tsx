import Link from 'next/link';
import React from 'react';

type props={
    text:string,
    link?:string
}

const AlertItem=({text, link}:props)=> {
    return (
        <div className='w-3/5 min-w-fit h-14 relative flex items-center justify-center'>
            <div
                className='absolute h-full w-[calc(100%+56px)] -translate-x-[28px] top-0 left-0 flex flex-col justify-between items-center'>
                <div
                    className='w-full h-0 border-[28px] border-t-0 border-transparent border-b-primary-red'/>
                <div
                    className='w-full h-0 border-[28px] border-b-0 border-transparent border-t-primary-red'/>
            </div>
            <div
                className='absolute h-[calc(100%-2px)] w-[calc(100%+54px)] -translate-x-[27px] top-[1px] left-0 flex flex-col justify-between items-center'>
                <div
                    className='w-full h-0 border-[27px] border-t-0 border-transparent border-b-weef-black'/>
                <div
                    className='w-full h-0 border-[27px] border-b-0 border-transparent border-t-weef-black'/>
            </div>
            {/*<div*/}
            {/*    className='absolute h-full w-[calc(100%+56px)] -translate-x-[28px] top-0 left-0 flex flex-col justify-between items-center'>*/}
            {/*    <div className='flex h-1/2 w-full'>*/}
            {/*    <div*/}
            {/*        className='w-1/2 h-full bg-primary  border-l-[1px] border-b-[1px] border-transparent skew-x-[45deg] -translate-x-[14px] rotate-180'>*/}
            {/*        <div className='w-full h-full bg-weef-black border-weef-black border-l-2' />*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        className='w-1/2 h-full border-l-[1px] border-t-[1px] bg-primary border-transparent -skew-x-[45deg] translate-x-[14px]'>*/}
            {/*        <div className='w-full h-full bg-weef-black' />*/}
            {/*    </div>*/}

            {/*    </div>*/}
            {/*    <div className='flex h-1/2 w-full'>*/}
            {/*    <div*/}
            {/*        className='w-1/2 h-full border-l-[1px] border-t-[1px] bg-primary border-transparent -skew-x-[45deg] -translate-x-[14px] rotate-180'>*/}
            {/*        <div className='w-full h-full bg-weef-black' />*/}
            {/*    </div>*/}
            {/*    <div*/}
            {/*        className='w-1/2 h-full border-l-[1px] border-b-[1px] bg-primary border-transparent skew-x-[45deg] translate-x-[14px]'>*/}
            {/*        <div className='w-full h-full bg-weef-black' />*/}
            {/*    </div>*/}

            {/*    </div>*/}
            {/*</div>*/}
            <div className='z-10'>
                {
                    link ?
                        <Link href={link}>
                            <a className='link text-center'>{text}</a>
                        </Link>
                        :
                        <p className='text-weef-white text-center'>{text}</p>
                }
            </div>
        </div>
    );
}

export default AlertItem;