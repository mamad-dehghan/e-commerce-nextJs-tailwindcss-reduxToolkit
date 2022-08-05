import React, {useEffect, useMemo, useRef, useState} from 'react';
import BasketIcon from "../../../utilities/icons/BasketIcon";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const BasketButton = () => {
    const {finalSum, countSum} = useSelector((state: RootState) => state.BasketSlice);
    const [isActive, setActive] = useState<boolean>(false)
    const [isActive2, setActive2] = useState<string>('')
    const [preState, setPreState] = useState<number>(finalSum);

    const basketIsEmpty = useMemo(() => {
        setActive(pre => !pre);
        return finalSum === 0;
    }, [finalSum]);

    useEffect(() => {
        if (finalSum !== preState)
            setActive2('animate-shake')
        setTimeout(() => {
            setActive2('')
        }, 400)
        setPreState(finalSum)
    }, [isActive])

    return (
        <div className='relative'>
            <div className={isActive2}>
                <BasketIcon isEmpty={basketIsEmpty}/>
            </div>
            {
                !basketIsEmpty &&
                <span
                    className={`absolute top-0 right-0 bg-primary-red w-4 h-4 font-medium text-xs flex items-center justify-center rounded-full ${''}`}>{countSum}</span>
            }
        </div>
    );
}

export default BasketButton;