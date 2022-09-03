import React, {SelectHTMLAttributes, useEffect, useMemo, useState} from 'react';
import classNames from "classnames";
import DownArrow from "../../../utilities/icons/customs/downArrow";
import Option from "./Option";
import useComponentVisible from "../../../utilities/hooks/useOutsideDetector";
import styles from "./style.module.scss";
import {Colors} from "../../../utilities/constants/colors";

interface Interface extends SelectHTMLAttributes<HTMLSelectElement> {
    position: 'absolute' | 'relative',
    initialValues?: string[],
    options: string[],
    title: string,
    onChange: any,
}

const MultiSelect = ({title, position, initialValues = [], options = [], onChange}: Interface) => {
    const [values, setValues] = useState<string[]>(initialValues);
    const [, render] = useState<boolean>(false)
    const {ref, open, setOpen} = useComponentVisible(false)

    useEffect(() => {
        onChange(values)
    }, [values.length])

    const classSelect = useMemo(() => {
        return classNames(
            "transition-all duration-300 max-h-[280px] overflow-auto",
            position === 'absolute' ? (open ? 'flex' : 'hidden') : (open ? 'flex h-fit' : 'flex h-0 overflow-hidden'),
            position === "absolute" ? 'bg-primary flex-col absolute justify-items-stretch p-[1px] pt-0 w-full left-0 rounded-b top-[100%]'
                : 'relative'
        )
    }, [position, open])

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

    const toggle = (value: string) => {
        const index = values.findIndex(item => item === value);

        if (index === -1) {
            setValues(prevState => [...prevState, value]);
        } else {
            const newValues = values;
            newValues.splice(index, 1);
            setValues(newValues);
        }
        render(pre => !pre);
    }

    return (
        <div ref={ref}
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
                            options.map((option, i) => (
                                <Option key={option}
                                        option={option}
                                        toggle={toggle}
                                        initial={initialValues.includes(option)}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <DownArrow color={Colors._white} className={arrowClassName}/>
        </div>
    );
}

export default React.memo(MultiSelect);