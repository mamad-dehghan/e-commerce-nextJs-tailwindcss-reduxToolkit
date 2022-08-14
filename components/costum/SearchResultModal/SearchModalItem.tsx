import React from 'react';
import Image from "next/image";
import IProduct from "../../../interfaces/product";
import Link from 'next/link';

type props = {
    product: IProduct
}

const SearchModalItem = ({product}: props) => {
    return (
        <Link href={`/Products/${product.id}`}><a>
            <div
                className='w-full flex items-center bg-secondary hover:bg-weef-black h-20 p-2 gap-3 first:rounded-t last:rounded-b cursor-pointer'>
                <div className='flex items-center justify-center h-10 w-10 overflow-hidden rounded'>
                    <Image objectFit={'cover'} width={40} height={40} src={product.main_image}
                           quality={25}
                           alt={product.name}/>
                </div>
                <div className='flex flex-col items-stretch h-full grow'>
                    <div className='h-1/2 flex items-center text-weef-white'>{product.name}</div>
                    <div className='h-1/2 flex justify-between items-center'>
                        <div className='text-weef-white flex items-center gap-1'>
                            <span>{product.price}</span><span>تومان</span>
                        </div>
                    </div>
                </div>
            </div>
        </a></Link>
    );
}

export default SearchModalItem;