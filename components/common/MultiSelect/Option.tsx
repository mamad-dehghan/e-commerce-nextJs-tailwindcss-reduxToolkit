import React, {useMemo, useState} from 'react';
import classNames from "classnames";

type option = {
    value: string,
    text: string,
}

type props = {
    option: option,
    toggle: Function,
    initial: boolean
}

const Option = ({option, toggle, initial}: props) => {
    const [checked, setChecked] = useState<boolean>(initial);

    const classLinks = useMemo(() => {
        return classNames(
            'leading-loose whitespace-nowrap hover:bg-weef-black min-w-fit text-xl  block text-weef-white  no-underline'
        )
    }, []);

    return (
        <span key={option.value}
              className='last:rounded-b overflow-hidden flex justify-between cursor-pointer transition-all duration-300 items-center bg-secondary h-12 gap-2 px-4 py-2 hover:bg-weef-black'
              onClick={() => {
                  setChecked(prev => !prev)
                  toggle(option.value)
              }}>
            <span
                className={classLinks}>{option.text}</span>
            <input className='pointer-events-none'
                   style={{accentColor: '#FF626D'}}
                   type="checkbox"
                   readOnly={true}
                   checked={checked}/>
        </span>
    );
}

export default Option;