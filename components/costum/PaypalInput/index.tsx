import React from 'react';

type props = {
    title: string
}

const PaypalInput = ({title}: props) => {
    return (
        <div key={title} className='w-full flex flex-col items-start gap-1'>
            <label className='text-xs font-medium w-fit text-gray-700' htmlFor={title}>{title}</label>
            <input className='w-full rounded-lg border border-gray-400 p-1' type="text" id={title} placeholder={title}/>
        </div>
    );
}

export default PaypalInput;