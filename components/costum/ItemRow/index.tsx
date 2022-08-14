import React, {useState} from 'react';

type props = {
    children: any,
    backgroundContent: string,
    backgroundContentOnHover: string,
}

const ItemRow = ({children, backgroundContent, backgroundContentOnHover}: props) => {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
             className='w-full min-w-fit h-14 z-10 px-12'>
            <div className='group w-full h-full relative'>
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 rotate-45 -translate-x-1/2 -z-10  border-primary-red border-r-transparent border-t-transparent transition-all duration-300"
                    style={{
                        width: `${Math.sqrt(1568)}px`,
                        height: `${Math.sqrt(1568)}px`,
                        borderWidth: `${Math.sqrt(2)}px`,
                        background: hover ? backgroundContentOnHover : backgroundContent
                    }}/>
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 rotate-45 translate-x-[calc(50%-0.5px)] -z-10 border-primary-orange border-l-transparent border-b-transparent transition-all duration-300"
                    style={{
                        width: `${Math.sqrt(1568)}px`,
                        height: `${Math.sqrt(1568)}px`,
                        borderWidth: `${Math.sqrt(2)}px`,
                        background: hover ? backgroundContentOnHover : backgroundContent
                    }}/>
                <div className='w-full h-full bg-primary py-0.5 z-20'>
                    <div className='w-full h-full transition-all duration-300 flex items-center justify-center pointer-events-none'
                         style={{
                             background: hover ? backgroundContentOnHover : backgroundContent
                         }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemRow;