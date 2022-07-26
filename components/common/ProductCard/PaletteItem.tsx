import React from 'react';

type props = {
    color:string
}

const PaletteItem=({color}:props)=> {
    return (
        <div className='flex items-center flex-shrink-0 justify-center h-1 overflow-visible'>
            <div style={{backgroundColor:color}} className='w-9 h-9 rounded-full hover:z-10'/>
        </div>
    );
}

export default PaletteItem;