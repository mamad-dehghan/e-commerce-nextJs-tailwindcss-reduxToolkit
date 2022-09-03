import React, {SelectHTMLAttributes, useMemo} from 'react';
import classNames from "classnames";
import DownArrow from "../../../utilities/icons/customs/downArrow";
import {useRouter} from "next/router";
import ICategory from "../../../interfaces/category";
import useComponentVisible from "../../../utilities/hooks/useOutsideDetector";
import styles from "../Select/style.module.scss";
import {Colors} from "../../../utilities/constants/colors";

type option = {
    name: string,
    slug: string,
    parent: ICategory | undefined
}

interface Interface extends SelectHTMLAttributes<HTMLSelectElement> {
    position: 'absolute' | 'relative',
    title: string,
    options: option[] | undefined
}

const CategorySelect = ({position, title = 'دسته بندی', options}: Interface) => {
    const {ref, open, setOpen} = useComponentVisible(false)
    const router = useRouter();

    const classSelect = useMemo(() => {
        return classNames(
            "transition-all duration-300 max-h-[280px] overflow-auto",
            position === 'absolute' ? (open ? 'flex' : 'hidden') : (open ? 'flex h-fit' : 'flex h-0 overflow-hidden'),
            position === "absolute" ? 'bg-primary flex-col absolute justify-items-stretch p-[1px] pt-0 w-full left-0 rounded-b top-[100%]'
                : 'relative'
        )
    }, [position, open])

    const classLinks = useMemo(() => {
        return classNames(
            'leading-loose whitespace-nowrap hover:bg-weef-black min-w-fit text-xl w-full py-1 px-4 block text-weef-white no-underline cursor-pointer transition-all duration-300 bg-secondary last:rounded-b'
        )
    }, []);

    const classContainer = useMemo(() => {
        return classNames(
            'relative bg-primary h-fit overflow-y-visible flex flex-col w-[318px] justify-items-stretch cursor-pointer p-[1px]',
            open ? 'rounded-t' : 'rounded',
            position === 'absolute' ? '' : 'rounded'
        )
    }, [open, position])

    const titleClass = useMemo(() => {
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
        <div
            ref={ref}
            dir='rtl'
            className={classContainer}>
            <span
                onClick={() => setOpen(!open)}
                className={titleClass}>{title}</span>
            <div
                className={classSelect}>
                <div className={styles.scrollHidden}>
                    <div
                        className={'bg-weef-black flex flex-col justify-items-stretch w-full transition-all duration-300 gap-0.5 rounded'}>
                        {
                            options?.map(option => (
                                <span
                                    key={option.slug}
                                    onClick={() => {
                                        setOpen(false);
                                        router.push(`/Category/${option.parent?.slug}/${option.slug}`)
                                    }}
                                    className={classLinks}>{option.name}</span>
                            ))
                        }
                    </div>
                </div>
            </div>
            <DownArrow color={Colors._white} className={arrowClassName}/>
        </div>
    );
}

export default React.memo(CategorySelect);