import React, {useEffect, useMemo, useState} from 'react';
import {TwoThumbInputRange} from "react-two-thumb-input-range"
import classNames from "classnames";
import DownArrow from "../../../utilities/icons/customs/downArrow";

type values = [number, number];

type props = {
    min: number,
    max: number,
    initialValue?: [number, number],
    handleChange: Function
}

const Index = ({min, max, handleChange, initialValue = undefined}: props) => {
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
                    <DownArrow color='#FAFAFA' className={arrowClassName}/>
                </div>
                <div className={className}>
                    <div className='translate-y-10'>
                        <TwoThumbInputRange
                            onChange={onValueChange}
                            railColor='#232227'
                            thumbStyle={{
                                background: '#232227',
                                width: '20px',
                                height: '20px',
                                border: '1px solid #FF626D',
                                borderRadius: '50%'
                            }}
                            thumbFocusStyle={{
                                background: '#232227',
                                width: '20px',
                                height: '20px',
                                border: '2px solid #FF626D',
                                borderRadius: '50%',
                                boxShadow: 'none'
                            }}
                            trackColor={'#FCAD72'}
                            inputStyle={{
                                height: '10px',
                                width: '17rem'
                            }}
                            values={value}
                            labelTextStyle={{
                                color: '#FAFAFA',
                            }}
                            labelStyle={{
                                backgroundColor: '#4C4C4C',
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

export default Index;