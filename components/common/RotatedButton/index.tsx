import React, {useCallback, useMemo} from 'react';
import classNames from "classnames";
import {Colors} from "../../../utilities/constants/colors";

type props = {
    onClick?: Function,
    heightOnPx: number,
    className?: string,
    background: string,
    title?: string,
    children: any
}

const RotatedButton = ({
                           onClick,
                           heightOnPx,
                           className,
                           background,
                           title,
                           children
                       }: props) => {
    const wrapperClassName = useMemo(() =>
            classNames(
                'rotate-45 group p-[1px] flex items-center justify-center select-none z-10 shrink-0 hover:z-20',
                onClick && 'cursor-pointer',
                background === 'linear' && 'bg-gradient-to-tr from-primary-red to-primary-orange',
                background === Colors._primary_red && 'bg-primary-red',
                background === Colors._primary_orange && 'bg-primary-orange',
                background === Colors._black && 'bg-weef-black',
                className
            )
        , [background, className, onClick])

    const length = useMemo(() => Math.sqrt(1 / 2) * heightOnPx + 'px', [heightOnPx])

    const handleClick = useCallback(() => {
        onClick && onClick()
    }, [onClick])

    return (
        <div onClick={handleClick}
             title={title}
             className={wrapperClassName}
             style={{
                 width: length,
                 height: length
             }}>
            <span
                className='w-full h-full bg-weef-black group-hover:bg-transparent flex items-center justify-center overflow-hidden'>
                <span
                    className='-rotate-45 w-full h-full flex items-center justify-center text-weef-white group-hover:text-weef-black'>
                    {children}
                </span>
            </span>
        </div>
    );
}

export default RotatedButton;