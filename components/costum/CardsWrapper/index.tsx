import React from 'react';
import ProductCard from "../../common/ProductCard";

type product = {
    id: string
    title: string,
    price: string,
    sizes?: string[] | number[] | undefined,
    colors?: string[] | undefined,
    image: string | any
}

type props = {
    products: product[]
}

function CardsWrapper({products}: props) {
    return (
        <div className='flex flex-row w-full flex-wrap gap-4 items-center justify-center px-16'>
            {
                products.map(product => (
                    <ProductCard key={product.id}
                                 title={product.title}
                                 image={product.image}
                                 price={product.price}
                                 sizes={product.sizes}
                                 colors={product.colors}/>
                ))
            }
        </div>
    );
}

export default CardsWrapper;