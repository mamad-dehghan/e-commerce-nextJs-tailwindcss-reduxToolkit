import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Head from "next/Head";
import Image from 'next/image'
import DefaultLayout from "../../layouts/DefaultLayout";
import BreadcrumbSection from "../../components/costum/BreadcrumbSection";
import Section from "../../components/costum/Section";
import MultiButton from "../../components/common/MultiButton";
import _3DigitSeparator from "../../utilities/functions/_3DigitSeparator";
import axios from "axios";
import IProduct from "../../interfaces/IProduct";
import ICategory from "../../interfaces/ICategory";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, changeProductColor, changeProductSize, removeProduct} from "../../redux/slices/BasketSlice";

type props = {
    product: IProduct,
    categories: ICategory[],
    category: ICategory,
    similarProducts: IProduct[]
}

const SingleProduct = ({product, categories, category, similarProducts}: props) => {
    const dispatch = useDispatch();
    const {products: basketProducts} = useSelector((state: any) => state.BasketSlice);

    const productDetails = useMemo(() => {
        const findCategoryById = (id: any): ICategory | undefined => {
            return categories.find(category => category.id === id)
        }
        const breadcrumb = [
            {
                name: 'homepage',
                link: '/'
            },
            {
                name: category.name,
                link: `/Category/${category.parent?.slug}/${category.slug}`
            },
            {
                name: product.name,
                link: `/Category/${findCategoryById(category.parent)?.slug}/${category.slug}/${product.slug}`,
                disable: true
            }
        ]
        return {
            name: product?.name,
            price: _3DigitSeparator(product?.price),
            image: product?.main_image,
            category: category.name,
            description: product?.description,
            colors: product?.attributes.colors,
            brand: product?.attributes.brand,
            sizes: product?.attributes.sizes,
            rating: product?.attributes.rating,
            breadcrumb
        }
    }, [product]);

    const [selectedColor, setSelectedColor] = useState<string | undefined>(productDetails.colors ? productDetails.colors[0] : undefined)
    const [selectedSize, setSelectedSize] = useState<string | number | undefined>(productDetails.sizes ? productDetails.sizes[0] : undefined)

    useEffect(()=>{
        dispatch(changeProductColor({
            id:product.id,
            color:selectedColor
        }))
    },[selectedColor])

    useEffect(()=>{
        dispatch(changeProductSize({
            id: product.id,
            size: selectedSize
        }))
    },[selectedSize])

    const handleReduceCount = useCallback(() => {
        dispatch(removeProduct(product))
    }, [dispatch, product])

    const handleIncreaseCount = useCallback(() => {
        dispatch(addProduct({
            product,
            size: productDetails.sizes ? productDetails.sizes[0] : undefined,
            color: productDetails.colors ? productDetails.colors[0] : undefined
        }));
    }, [dispatch, productDetails])

    const initialCount = useMemo(() => {
        try {
            const index: number = basketProducts.products.findIndex(product);
            const count: number = (index === -1) ? 0 : basketProducts.products[index].count;
            return count;
        } catch (e) {
            return 0;
        }
    }, [basketProducts.products, product])

    return (
        <>
            <Head>
                <title>{productDetails.name}</title>
            </Head>
            <DefaultLayout>
                <div className='w-full flex flex-col items-stretch'>
                    <BreadcrumbSection
                        options={productDetails.breadcrumb}/>
                    <div className='Container pt-4 pb-8'>
                        <div className='flex flex-col justify-start items-stretch gap-2 p-2'>
                            <div className='flex flex-col px-12 py-4 gap-5 items-start justify-start'>
                                <p className='w-fit text-weef-white text-[40px] font-medium'>
                                    <span>{productDetails.category}</span> <span>{productDetails.brand}</span></p>
                                <p className='w-fit text-weef-white text-2xl'>{productDetails.name}</p>
                            </div>
                            <div className='flex items-start'>
                                <div className='flex flex-col items-stretch justify-start w-[calc(100%-480px)]'>
                                    <div className='w-full'>
                                        {
                                            productDetails.colors &&
                                            <div
                                                className='flex float-right min-w-[50%] h-14 items-center justify-start px-4 gap-4 self-start'>
                                                <span
                                                    className='text-weef-white whitespace-nowrap'>رنگ های موجود:</span>
                                                <div className='flex gap-1'>
                                                    {
                                                        productDetails.colors.map(color => (
                                                            <div key={color}
                                                                 onClick={() => setSelectedColor(color)}
                                                                 style={{backgroundColor: color}}
                                                                 className='w-9 h-9 rounded-full hover:border hover:border-primary-red active:border-2 active:border-primary-red cursor-pointer'/>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                        {
                                            productDetails.sizes &&
                                            <div
                                                className='flex float-left min-w-[50%] h-14 items-center justify-start px-4 gap-4 self-end'>
                                                <span
                                                    className='text-weef-white whitespace-nowrap'>سایز های موجود:</span>
                                                <div className='flex gap-1'>
                                                    {
                                                        productDetails.sizes.map(size => (
                                                            <div key={size}
                                                                 onClick={() => setSelectedSize(size)}
                                                                 className='w-5 h-5 flex items-center justify-center rounded-sm bg-weef-white text-weef-black cursor-pointer hover:border hover:border-primary-red'>
                                                                {size}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='w-full'>
                                        <div
                                            className='flex float-right min-w-[50%] h-14 items-center justify-start px-4 gap-8 self-start'>
                                            <div className='text-weef-white'>قیمت:</div>
                                            <div className='flex items-center gap-2'>
                                                <div
                                                    className='text-weef-white font-extralight'>{productDetails.price}</div>
                                                <div className='text-weef-white font-extralight'>ریال</div>
                                            </div>
                                        </div>
                                        <div
                                            className='flex float-left min-w-[50%] h-14 items-center justify-start px-4 self-end'>
                                            <MultiButton reduceCount={handleReduceCount}
                                                         increaseCount={handleIncreaseCount}
                                                         initialCount={initialCount || 0}/>
                                        </div>
                                    </div>
                                    <div className='w-full gap-2 p-2 flex flex-col text-weef-white'>
                                        <div>مشخصات محصول:</div>
                                        <p>{productDetails.description}</p>
                                    </div>
                                    <div className='w-full flex flex-col gap-2 py-2 items-start text-weef-white'>
                                        <div>از دید کاریران:</div>
                                        <div><span>امتیاز:</span><span>{productDetails.rating}</span><span>star</span>
                                        </div>
                                        <div>نظرات کاربران:</div>
                                        {
                                            productDetails.description
                                        }
                                    </div>
                                </div>
                                <div className='w-fit'>
                                    <div
                                        className='rounded-full w-[480px] h-[480px] bg-primary p-0.5 overflow-hidden'>
                                        <Image layout={"responsive"} width='100%' height='100%'
                                               style={{borderRadius: '50%'}}
                                               src={productDetails.image} alt={productDetails.name}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Section
                        slider={{
                            title: 'محصولات مشابه',
                            products: similarProducts
                        }}
                    />
                </div>
            </DefaultLayout>
        </>
    );
}

export async function getServerSideProps(input: any) {
    const product: IProduct = await axios(`http://localhost:8000/store/product/id/${input.query.id}`)
        .then(res => res.data);

    let similarProducts: IProduct[] = await axios('http://localhost:8000/store/product/featured?format=json')
        .then((res: any) => res.data)
    similarProducts = similarProducts.filter(item => item.id != input.query.id);


    const categories: ICategory[] = await axios(`http://localhost:8000/store/category`)
        .then((res: any) => res.data)

    const category = categories.find(category => category.id === product.category)

    return {
        props: {
            product,
            categories,
            category,
            similarProducts
        }
    }
}

export default SingleProduct;