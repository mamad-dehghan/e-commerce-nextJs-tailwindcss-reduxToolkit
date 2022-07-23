import React, {ButtonHTMLAttributes, useMemo} from 'react';
import classNames from "classnames";

interface propsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    size: 'small' | 'medium' | 'large',
    disable?: boolean
}

function Button({
                    size,
                    children,
                    disable = false,
                    ...props
                }: propsType) {

    const spanStyles = useMemo(() => {
        return classNames(
            'flex items-center justify-center py-[7px]  rounded-md ',
            disable ? 'text-weef-secondary-light bg-secondary' : " transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0 text-weef-white group-hover:text-black ",
            size === 'small' ? 'text-base px-[15px] h-[34px]' : '',
            size === 'medium' ? 'text-xl px-[23px] h-[46px]' : '',
            size === 'large' ? 'text-2xl px-[35px] h-[54px]' : '',
        );
    }, [size, disable]);

    const buttonStyles = useMemo(() => {
        return classNames(
            'inline-block items-center justify-center rounded-md  p-[1px] overflow-hidden rounded-md',
            disable ? 'bg-weef-secondary-light cursor-default' : " group bg-primary"
        )
    }, [disable]);

    return (
        <button
            {...props}
            className={buttonStyles}>
            <span className={spanStyles}>{children}</span>
        </button>
    );
}

export default React.memo(Button);