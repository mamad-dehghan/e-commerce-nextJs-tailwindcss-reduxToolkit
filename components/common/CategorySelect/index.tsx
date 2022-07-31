import React, {SelectHTMLAttributes, useEffect, useMemo, useState} from 'react';
import classNames from "classnames";
import DownArrow from "../../../utilities/icons/customs/downArrow";
import ICategory from "../../../interfaces/ICategory";
import Link from "next/link";
import {useRouter} from "next/router";

type option = {
    name: string,
    slug: string,
    parent: ICategory | undefined
}

interface Interface extends SelectHTMLAttributes<HTMLSelectElement> {
    position: 'absolute' | 'relative',
    initialValue?: string,
    options: option[] | undefined
}

const Select = ({position, initialValue = 'دسته یندی', options, onChange}: Interface) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(initialValue);
    const [event, setEvent] = useState<any>();
    const router = useRouter();

    useEffect(() => {
        onChange && event && onChange(event);
    }, [event, onChange])

    const classSelect = useMemo(() => {
        return classNames(
            "transition-all duration-300",
            position === 'absolute' ? (open ? 'flex' : 'hidden') : (open ? 'flex h-fit' : 'flex h-0 overflow-hidden'),
            position === "absolute" ? 'bg-primary flex-col absolute justify-items-stretch p-[1px] pt-0  w-full translate-x-[1px] rounded-b top-[100%]'
                : 'relative'
        )
    }, [position, open])

    const classLinks = useMemo(() => {
        return classNames(
            'leading-loose whitespace-nowrap hover:bg-weef-black min-w-fit text-xl w-full py-1 px-4 block text-weef-white  no-underline cursor-pointer transition-all duration-300 bg-secondary  last:rounded-b'
        )
    }, []);

    const classContainer = useMemo(() => {
        return classNames(
            'relative bg-primary h-fit overflow-y-visible flex flex-col w-[318px] justify-items-stretch cursor-pointer',
            open ? 'p-[1px] rounded-t' : 'p-[1px] rounded',
            position === 'absolute' ? '' : 'rounded'
        )
    }, [open, position])

    const Container = useMemo(() => {
        return classNames(
            'bg-weef-black leading-loose whitespace-nowrap min-w-fit w-full px-4 py-[3px] block text-weef-white text-xl',
            open ? 'rounded-t' : 'rounded'
        )
    }, [open])

    const arrowClassName = useMemo(() => {
        return classNames(
            'absolute left-3 pointer-events-none top-5 transition-all duration-300',
            open ? '-rotate-180' : ''
        )
    }, [open])

    return (
        <>
            <div
                dir='rtl'
                className={classContainer}>
                <span
                    onClick={() => setOpen(open => !open)}
                    className={Container}>{initialValue}</span>
                <div
                    className={classSelect}>
                    <div
                        className={'bg-weef-black flex flex-col justify-items-stretch w-full transition-all duration-300 gap-0.5 rounded'}>
                        {
                            options?.map(option => (
                                <span
                                    key={option.slug}
                                    onClick={(e) => {
                                        setEvent(e)
                                        setValue(option.slug);
                                        setOpen(false);
                                        router.push(`/Products/${option.parent?.slug}/${option.slug}`)
                                    }}
                                    className={classLinks}>{option.name}<>{console.log(option)}</></span>
                            ))
                        }
                    </div>
                </div>
                <DownArrow color='#FAFAFA' className={arrowClassName}/>
            </div>
        </>
    );
}

export default React.memo(Select);