import React from 'react';

type props = {
    size: string | number
}

const SizeItem = ({size}: props) => {
    return (
        <div className='w-5 h-5 flex items-center justify-center rounded-sm bg-weef-white text-weef-black'>
            {size}
        </div>
    );
}

export default SizeItem;