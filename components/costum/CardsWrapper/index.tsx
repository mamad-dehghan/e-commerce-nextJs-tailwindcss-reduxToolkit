import React from 'react';
import ProductCard from "../../common/ProductCard";
import IProduct from "../../../interfaces/IProduct";

type props = {
    products: IProduct[]
}

function CardsWrapper({products}: props) {
    return (
        <div className='flex flex-row w-full flex-wrap gap-4 items-center justify-center px-8'>
            {
                products.map(product => (
                    <ProductCard key={product.id}
                                 product={product}/>
                ))
            }
        </div>
    );
}

export default React.memo(CardsWrapper);