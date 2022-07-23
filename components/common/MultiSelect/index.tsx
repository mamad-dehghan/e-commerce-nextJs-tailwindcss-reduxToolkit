import React, {MouseEventHandler, SelectHTMLAttributes, useEffect, useMemo, useState} from 'react';
import classNames from "classnames";
import DownArrow from "../../../utilities/icons/customs/downArrow";
import {value} from "dom7";

type option = {
    value: string,
    text: string,
}

interface Interface extends SelectHTMLAttributes<HTMLSelectElement> {
    position: 'absolute' | 'relative',
    initialValues?: string[],
    options: option[],
    title: string
}

const MultiSelect = ({title, position, initialValues = [], options=[], onChange}: Interface) => {
    const [open, setOpen] = useState<boolean>(false);
    const [values, setValues] = useState<string[]>(initialValues);
    const [event, setEvent] = useState<any>();
    const [list, setList] = useState<boolean[]>(options.map(option=>initialValues?.includes(option.value)))

    useEffect(()=>{
        setList(values.map(option=>values.includes(option)))
    },[values])

    const classSelect = useMemo(() => {
        return classNames(
            "transition-all   duration-300 ",
            position === 'absolute' ? (open ? 'flex ' : 'hidden') : (open ? 'flex h-fit' : 'flex h-0 overflow-hidden'),
            position === "absolute" ? 'bg-primary flex-col absolute justify-items-stretch p-[1px] pt-0  w-full translate-x-[1px]  rounded-b-md  top-[100%]'
                : 'relative'
        )
    }, [position, open])

    const classLinks = useMemo(() => {
        return classNames(
            'leading-loose whitespace-nowrap hover:bg-weef-black min-w-fit text-xl w-full py-1 px-4 block text-weef-white  no-underline cursor-pointer transition-all duration-300 bg-secondary  last:rounded-b-md'
        )
    }, []);

    const classContainer = useMemo(() => {
        return classNames(
            'relative bg-primary h-fit overflow-y-visible flex flex-col w-[318px] justify-items-stretch cursor-pointer transition-all duration-300',
            open ? 'p-[1px] rounded-t-md' : ' p-[1px] rounded-md',
            position === 'absolute' ? '' : 'rounded-md'
        )
    }, [open, position])

    const Container = useMemo(() => {
        return classNames(
            'bg-weef-black leading-loose whitespace-nowrap min-w-fit w-full px-4 py-[3px] block text-weef-white  text-xl transition-all duration-300',
            open ? 'rounded-t-md' : '  rounded-md'
        )
    }, [open])

    console.log(values!==[] ?(values.map(item => options?.find(r => r.value === item)?.text).concat(' و ')):title)


    return (
        <>
            <div
                dir='rtl'
                className={classContainer}>
                <span
                    onClick={() => setOpen(open => !open)}
                    className={Container}>{values!==[] ?values.map(item=>options?.find(r=>r.value===item)?.text).concat(' و '):title}</span>
                <div
                    className={classSelect}>
                    <div
                        className={'bg-weef-black flex flex-col justify-items-stretch w-full transition-all duration-300 gap-0.5 rounded-md'}>
                        {
                            options.map((option, i) => (
                                <span key={option.value} className='relative last:rounded-b-md overflow-hidden'
                                      onClick={async () => {
                                          const index = values.findIndex(item => item === option.value);
                                          console.log(index)

                                          if (index === -1)
                                              setValues(prevState => [...prevState, option.value])
                                          else{
                                              console.log(index)
                                              console.log(index)
                                              const newValues = values;
                                              newValues.splice(index, 1)
                                              console.log(newValues)
                                              setValues(newValues)
                                          }
                                      }}>
                                <span
                                    className={classLinks}>{option.text}</span>
                                    <input type="checkbox"  checked={list[i]} className='absolute left-3 top-5 cursor-pointer' />
                                </span>
                            ))
                        }
                    </div>
                </div>
                <DownArrow color='#FAFAFA' className={'absolute left-3 pointer-events-none top-5'}/>
            </div>
        </>
    );
}

export default React.memo(MultiSelect);