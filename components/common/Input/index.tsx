import React, {InputHTMLAttributes, useEffect, useState} from 'react';

const Input = ({...props}: InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <input
            dir='auto'
            className="bg-secondary text-weef-white ring-[1px] ring-secondary placeholder-weef-grey outline-0 focus:outline-0 text-base rounded-md focus:border-0 border-0 focus:ring-primary-red block w-[320px] p-2.5"
            {...props}/>
    );
}

export default Input;