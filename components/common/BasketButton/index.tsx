import React, {useEffect, useState} from 'react';
import BasketIcon from "../../../utilities/icons/BasketIcon";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const BasketButton = () => {
    const {countSum} = useSelector((state: RootState) => state.BasketSlice)
    const [animationClass, setAnimationClass] = useState<string>('')

    useEffect(() => {
        setAnimationClass('animate-shake')
        setTimeout(() => {
            setAnimationClass('')
        }, 400)
    }, [countSum])

    return (
        <div className='relative'>
            <div className={animationClass}>
                <BasketIcon isEmpty={countSum === 0}/>
            </div>
            {
                !(countSum === 0) &&
                <span
                    className='absolute top-0 right-0 bg-primary-red w-4 h-4 font-medium text-xs flex items-center justify-center rounded-full'>{countSum}</span>
            }
        </div>
    );
}

export default BasketButton;