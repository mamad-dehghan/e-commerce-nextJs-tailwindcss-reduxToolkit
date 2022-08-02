import React, {useCallback, useMemo, useState} from 'react';
import classNames from "classnames";

type props = {
    initialCount: number,
    reduceCount: Function,
    increaseCount: Function
}

const MultiButton = ({initialCount, increaseCount, reduceCount}: props) => {
    const [count, setCount] = useState<number>(initialCount);

    const handleReduce = useCallback(() => {
        if (count > 0) {
            setCount(count => count - 1);
            reduceCount()
        }
    }, [count, reduceCount])

    const handleIncrease = useCallback(() => {
        setCount(count => count + 1);
        increaseCount()
    }, [increaseCount])

    const classNameReduceSpan = useMemo(() => {
        return classNames(
            'w-full h-full rounded-full flex items-center justify-center font-bold text-2xl',
            (count > 0) ? 'bg-weef-black group-hover:bg-transparent text-weef-white group-hover:text-weef-black' : 'bg-secondary text-weef-grey'
        )
    }, [count])

    return (
        <div dir='ltr' className='bg-primary rounded-[26px] h-14 w-40 p-[1px] cursor-default'>
            <div className='bg-secondary flex gap-1 items-center p-1 rounded-[26px] w-full h-full'>
                <button
                    disabled={count <= 0}
                    onClick={handleReduce}
                    className='w-12 h-12 rounded-full bg-primary p-[1px] group flex items-center justify-center'>
                    <span
                        className={classNameReduceSpan}>-</span>
                </button>
                <div className='w-12 h-12 rounded-full bg-primary p-[1px] flex items-center justify-center'>
                    <span
                        className='w-full h-full rounded-full bg-weef-black flex items-center justify-center text-weef-white font-semibold text-2xl'>{count}</span>
                </div>
                <button
                    onClick={handleIncrease}
                    className='w-12 h-12 rounded-full bg-primary p-[1px] group flex items-center justify-center'>
                    <span
                        className='w-full h-full rounded-full bg-weef-black group-hover:bg-transparent flex items-center justify-center text-weef-white group-hover:text-weef-black font-bold text-2xl'>+</span>
                </button>
            </div>
        </div>
    );
}

export default MultiButton;