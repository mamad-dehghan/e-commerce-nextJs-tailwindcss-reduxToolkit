import React, {InputHTMLAttributes, useEffect, useMemo, useState} from 'react';
import classNames from "classnames";

const Input = ({className, about, ...props}: InputHTMLAttributes<HTMLInputElement>) => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    useEffect(() => {
        if (about)
            setErrorMessage(about)
        else
            setTimeout(() => {
                setErrorMessage('')
            }, 300)
    }, [about]);

    const errorClassName = useMemo(() => {
        return classNames(
            'absolute bg-primary-red h-full rounded-r w-[calc(100%-220px)] sm:w-[calc(100%-300px)] right-0 -z-10 top-0 flex items-center pr-1 pl-3 transition-transform ease-in-out duration-300 whitespace-nowrap',
            about ? ' ring-[1px] ring-primary-red' : '-translate-x-[100%]'
        )
    }, [about]);

    const inputClassName = useMemo(() => {
        return classNames(
            'bg-secondary text-weef-white ring-[1px] placeholder-weef-grey outline-0 focus:outline-0 text-base rounded-md focus:border-0 border-0 focus:ring-primary-red block w-[240px] sm:w-[320px] p-2 z-20',
            className,
            about ? 'ring-primary-red' : 'ring-secondary'
        )
    }, [about, className]);

    return (
        <div className='relative w-full flex justify-end'>
            <input
                dir='auto'
                className={inputClassName}
                {...props}/>
            <div className={errorClassName}>
                <div>{errorMessage}</div>
            </div>
        </div>
    );
}

export default Input;