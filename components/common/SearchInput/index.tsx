import React, {InputHTMLAttributes} from 'react';
import SearchIcon from "../../../utilities/icons/SearchIcon";

const SearchInput = ({...props}: InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <div className='relative w-fit h-fit'>
            <input
                className="bg-secondary pl-12 text-weef-white ring-[1px] ring-secondary placeholder:text-right placeholder:weef-grey outline-0 focus:outline-0  text-base rounded focus:border-0 border-0 focus:ring-primary-red block w-[320px] p-2.5"
                {...props}/>
            <SearchIcon className='absolute left-1 top-1 pointer-events-none'/>
        </div>
    );
}

export default SearchInput;