import React, {useMemo, useState} from 'react';
import classNames from "classnames";

type props = {
    option: string,
    toggle: Function,
    initial: boolean
}

const Option = ({option, toggle, initial}: props) => {
    const [checked, setChecked] = useState<boolean>(initial)

    const classLinks = useMemo(() => {
        return classNames(
            'min-w-fit w-full  block rounded border border-primary-red h-full bg-secondary'
        )
    }, []);

    return (
        <span key={option}
              className='last:rounded-b  overflow-hidden flex justify-between cursor-pointer transition-all duration-300 items-center bg-secondary h-12 gap-2 px-4 py-2 hover:bg-weef-black'
              onClick={() => {
                  setChecked(prev => !prev)
                  toggle(option)
              }}>
            <span
                className={classLinks} style={{backgroundColor: option}}/>
            <input className='pointer-events-none'
                   type="checkbox"
                   checked={checked}
                   readOnly={true}
                   style={{accentColor: '#FF626D'}}/>
        </span>
    );
}

export default React.memo(Option);