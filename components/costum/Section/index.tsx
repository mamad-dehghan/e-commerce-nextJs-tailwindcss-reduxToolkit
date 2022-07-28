import React, {ReactElement, useMemo} from 'react';
import classNames from "classnames";
import {JSXChild, JSXElement} from "@typescript-eslint/types/dist/generated/ast-spec";

type props = {
    background: 'black' | 'primary',
    title: string,
    children: ReactElement
}

const Section = ({background, title, children}: props) => {
    const wrapperClassName = useMemo(() => {
        return classNames(
            'w-full flex flex-col items-stretch justify-start py-8 gap-4',
            background === 'black' ? 'bg-weef-black' : 'bg-secondary'
        )
    }, [background]);

    const paragraphClassName = useMemo(() => {
        return classNames(
            'w-fit text-weef-white px-[4rem] text-[2rem] font-medium',
            background === 'black' ? 'bg-weef-black' : 'bg-secondary'
        )
    }, [background]);

    return (
        <div className={wrapperClassName}>
            <div className='relative w-full h-[4.5rem] flex items-center justify-center'>
                <div className='absolute w-full h-2 bg-primary'/>
                <div className='max-w-[1440px] w-full z-10 flex justify-start'>
                    <p className={paragraphClassName}>{title}</p>
                </div>
            </div>
            <div className='max-w-[1440px] w-full mx-auto'>
                <>
                    {children}
                </>
            </div>
        </div>
    );
}

export default Section;