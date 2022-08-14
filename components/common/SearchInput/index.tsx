import React, {useEffect, useMemo, useState} from 'react';
import SearchIcon from "../../../utilities/icons/SearchIcon";
import classNames from "classnames";

type props = {
    itemType: string,
    onChange: Function,
    initial: string,
    placeholder: string,
    toggleFocus?: Function,
    isFocus?: boolean
}

const SearchInput = ({
                         itemType = 'header',
                         onChange,
                         initial = '',
                         placeholder = '',
                         toggleFocus,
                         isFocus = false
                     }: props) => {
    const [inputValue, setInputValue] = useState<string>(initial);
    const [focus, setFocus] = useState<boolean>(false);

    useEffect(() => {
        toggleFocus && toggleFocus(focus);
    }, [focus])

    useEffect(() => {
        onChange(inputValue)
    }, [inputValue])

    const inputClassName = useMemo(() => {
        return classNames(
            'bg-secondary py-2.5 pr-2.5 pl-12 h-full text-weef-white placeholder:text-right placeholder:weef-grey outline-0 focus:outline-0 text-base rounded focus:border-0 border-0  block',
            itemType === 'header' ? 'w-full' : 'w-full'
        )
    }, [itemType])

    const wrapperClassName = useMemo(() => {
        return classNames(
            'relative p-[1px] rounded',
            isFocus ? 'bg-primary' : 'bg-secondary hover:bg-primary',
            !isFocus && focus ? 'bg-primary' : 'bg-secondary hover:bg-primary',
            itemType === 'header' ? 'w-[320px]' : 'w-full'
        )
    }, [itemType, focus]);

    return (
        <div className={wrapperClassName}>
            <input
                className={inputClassName}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                placeholder={placeholder}/>
            <SearchIcon className='absolute left-1 top-1/2 -translate-y-1/2 pointer-events-none'/>
        </div>
    );
}

export default React.memo(SearchInput);