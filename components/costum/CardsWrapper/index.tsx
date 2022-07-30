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
                                 title={product.name}
                                 image={product.main_image}
                                 price={product.price}
                                 sizes={product.attributes.sizes}
                                 colors={product.attributes.colors}/>
                ))
            }
        </div>
    );
}

export default React.memo(CardsWrapper);