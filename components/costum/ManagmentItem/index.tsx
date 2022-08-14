import React from 'react';
import ItemRow from "../ItemRow";
import IProduct from "../../../interfaces/IProduct";

type props = {
    product: IProduct
}

const ManagementItem = ({product}: props) => {
    return (
        <ItemRow backgroundContent='#333235' backgroundContentOnHover='#232227'>
            <div className='w-1/2 text-weef-white flex items-center pr-8'>{product.name}</div>
            <div
                className='w-[30%] h-full text-weef-white bg-weef-secondary-light group-hover:bg-secondary transition-all duration-300 flex items-center justify-center gap-1'>
                <span>{product.price}</span>تومان
            </div>
            <div className='w-1/5 text-weef-white flex items-center justify-center gap-1'>
                <span>{product.remaining}</span>عدد
            </div>
        </ItemRow>
    );
}

export default React.memo(ManagementItem);