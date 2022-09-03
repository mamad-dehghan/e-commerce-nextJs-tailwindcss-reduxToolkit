import React from 'react';
import ProductCard from "../../common/ProductCard";
import IProduct from "../../../interfaces/product";

type props = {
    products: IProduct[]
}

const reduceProducts = (products: IProduct[]) => {
    return products.reduce((all, item) => all + '/' + item.id, '')
}

const checkChange = (pre: props, next: props) => {
    return reduceProducts(pre.products) === reduceProducts(next.products)
}

const CardsWrapper = ({products}: props) => {
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

export default React.memo(CardsWrapper, checkChange);