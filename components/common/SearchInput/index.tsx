import React, { useEffect, useMemo, useState} from 'react';
import SearchIcon from "../../../utilities/icons/SearchIcon";
import classNames from "classnames";

type props = {
    itemType: string,
    onChange: Function,
    initial: string,
    placeholder: string
}

const SearchInput = ({itemType = 'header', onChange, initial = '', placeholder = ''}: props) => {
    const [inputValue, setInputValue] = useState<string>(initial);
    useEffect(() => {
        onChange(inputValue)
    }, [inputValue])

    console.log('run')

    const inputClassName = useMemo(() => {
        return classNames(
            'bg-secondary py-2.5 pr-2.5 pl-12 text-weef-white ring-[1px] ring-secondary placeholder:text-right placeholder:weef-grey outline-0 focus:outline-0 text-base rounded focus:border-0 border-0 focus:ring-primary-red block hover:ring-primary-orange',
            itemType === 'header' ? 'w-[320px]' : 'w-full'
        )
    }, [itemType])

    const wrapperClassName = useMemo(() => {
        return classNames(
            'relative',
            itemType === 'header' ? 'w-[320px]' : 'w-full'
        )
    }, [itemType])

    return (
        <div className={wrapperClassName}>
            <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                className={inputClassName}
                placeholder={placeholder}/>
            <SearchIcon className='absolute left-1 top-1 pointer-events-none'/>
        </div>
    );
}

export default React.memo(SearchInput);