import React, {useEffect, useMemo, useState} from 'react';

type props = {
    children: any,
    backgroundContent: string,
    backgroundContentOnHover: string,
    heightOnPx?: number,
    toggleHover?: Function
}

const ItemRow = ({children, backgroundContent, backgroundContentOnHover, heightOnPx = 56, toggleHover}: props) => {
    const [hover, setHover] = useState<boolean>(false)

    useEffect(() => {
        toggleHover && toggleHover(hover)
    })

    const length = useMemo(() => {
        return Math.sqrt(1 / 2) * heightOnPx + 'px'
    }, [heightOnPx])

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
             className='w-full min-w-fit z-10 mx-12'
             style={{
                 height: `${heightOnPx}px`,
                 zIndex: hover ? 40 : 0
             }}>
            <div className='w-full h-full relative'>
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 rotate-45 -translate-x-1/2 -z-10  border-primary-red border-r-transparent border-t-transparent transition-all duration-300"
                    style={{
                        width: length,
                        height: length,
                        borderWidth: `${Math.sqrt(2)}px`,
                        background: hover ? backgroundContentOnHover : backgroundContent
                    }}/>
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 rotate-45 translate-x-[calc(50%-0.6px)] -z-10 border-primary-orange border-l-transparent border-b-transparent transition-all duration-300"
                    style={{
                        width: length,
                        height: length,
                        borderWidth: `${Math.sqrt(2)}px`,
                        background: hover ? backgroundContentOnHover : backgroundContent
                    }}/>
                <div className='w-full h-full bg-primary py-0.5 z-20'>
                    <div className='w-full h-full transition-all duration-300 flex items-center justify-center'
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