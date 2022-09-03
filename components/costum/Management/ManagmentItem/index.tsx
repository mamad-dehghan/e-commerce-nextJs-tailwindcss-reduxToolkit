import React, {useMemo, useState} from 'react';
import ItemRow from "../../ItemRow";
import classNames from "classnames";
import {Colors} from "../../../../utilities/constants/colors";

type itemType = {
    title: string
    width: number
}

type props = {
    items: itemType[],
    heightOnPx?:number,
    children?:any
}

const ManagementItem = ({items, heightOnPx,children}: props) => {
    const [hover, setHover] = useState<boolean>(false)

    const className = useMemo(() => {
        return classNames(
            'h-full text-weef-white flex items-center pr-8 transition-all duration-300 flex items-center justify-center gap-1 first:pr-4',
            hover ? 'even:bg-secondary' : 'even:bg-weef-secondary-light'
        )
    }, [hover])

    return (
        <ItemRow heightOnPx={heightOnPx} backgroundContent={Colors._secondary} backgroundContentOnHover={Colors._black} toggleHover={setHover}>
            {
                items.map((item, index) => (
                    <div key={index}
                         className={className}
                         style={{
                             width: `${item.width}%`
                         }}>
                        {item.title}
                    </div>
                ))
            }
            {children}
        </ItemRow>
    );
}

export default React.memo(ManagementItem);