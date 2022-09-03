import React, {useEffect, useMemo, useState} from 'react';
import {TwoThumbInputRange} from "react-two-thumb-input-range"
import classNames from "classnames";
import DownArrow from "../../../utilities/icons/customs/downArrow";
import {Colors} from "../../../utilities/constants/colors";

type values = [number, number];

type props = {
    min: number,
    max: number,
    initialValue?: [number, number],
    handleChange: Function
}

const PriceRange = ({min, max, handleChange, initialValue = undefined}: props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<[number, number]>(initialValue !== undefined ? initialValue : [max, min])

    useEffect(() => {
        handleChange(value)
    }, [handleChange, value])

    const onValueChange = (values: values) => {
        setValue(values.sort((a, b) => a - b))
    }

    const className = useMemo(() => {
        return classNames(
            'relative bg-secondary w-full rounded-b h-24 overflow-none',
            open ? '' : 'hidden'
        )
    }, [open])

    const arrowClassName = useMemo(() => {
        return classNames(
            'pointer-events-none transition-all duration-300',
            open ? '-rotate-180' : ''
        )
    }, [open])

    const divClassName = useMemo(() => {
        return classNames(
            'bg-weef-black h-[46px] flex flex-row items-center text-weef-white pr-4 pl-3 justify-between',
            open ? 'rounded-t' : 'rounded'
        )
    }, [open])

    return (
        <div className='bg-primary p-[1px] rounded cursor-pointer'>
            <div dir='ltr'
                 className='rounded w-full flex flex-col items-stretch bg-weef-black gap-0.5'>
                <div dir='rtl'
                     onClick={() => setOpen(open => !open)}
                     className={divClassName}>
                    <p className='bg-weef-black leading-loose whitespace-nowrap min-w-fit w-full py-[3px] block text-weef-white text-xl rounded'>قیمت</p>
                    <DownArrow color={Colors._white} className={arrowClassName}/>
                </div>
                <div className={className}>
                    <div className='translate-y-10'>
                        <TwoThumbInputRange
                            onChange={onValueChange}
                            railColor={Colors._black}
                            thumbStyle={{
                                background: Colors._black,
                                width: '20px',
                                height: '20px',
                                border: `1px solid ${Colors._primary_red}`,
                                borderRadius: '50%'
                            }}
                            thumbFocusStyle={{
                                background: Colors._black,
                                width: '20px',
                                height: '20px',
                                border: `2px solid ${Colors._primary_red}`,
                                borderRadius: '50%',
                                boxShadow: 'none'
                            }}
                            trackColor={Colors._primary_orange}
                            inputStyle={{
                                height: '10px',
                                width: '17rem'
                            }}
                            values={value}
                            labelTextStyle={{
                                color: Colors._white,
                            }}
                            labelStyle={{
                                backgroundColor: Colors._secondary_light,
                            }}
                            min={min}
                            max={max}/>
                    </div>
                    <span
                        className='absolute text-weef-white left-0 bottom-0 -translate-y-2 translate-x-2 text-[14px]'>{min}</span>
                    <span
                        className='absolute text-weef-white right-0 bottom-0 -translate-y-2 -translate-x-2 text-[14px]'>{max}</span>
                </div>
            </div>
        </div>
    );
}

export default PriceRange;