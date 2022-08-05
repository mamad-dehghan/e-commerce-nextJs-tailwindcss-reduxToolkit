import React, {useCallback, useEffect, useState} from 'react';
import Head from "next/head";
import Image from 'next/image'
import DefaultLayout from "../../layouts/DefaultLayout";
import BreadcrumbSection from "../../components/costum/BreadcrumbSection";
import Section from "../../components/costum/Section";
import MultiButton from "../../components/common/MultiButton";
import _3DigitSeparator from "../../utilities/functions/_3DigitSeparator";
import axios from "axios";
import IProduct from "../../interfaces/IProduct";
import ICategory from "../../interfaces/ICategory";
import {useDispatch} from "react-redux";
import {addProduct, changeProductColor, changeProductSize, removeProduct} from "../../redux/slices/BasketSlice";


type breadcrumbType = {
    link: string,
    name: string,
    disable?: boolean
}

type singleProductDetailsType = {
    product: IProduct,
    breadcrumb: breadcrumbType[]
}

type props = {
    singleProductDetails: singleProductDetailsType,
    similarProducts: IProduct[]
}

const SingleProduct = ({singleProductDetails: {product, breadcrumb}, similarProducts}: props) => {
    const dispatch = useDispatch();

    const [selectedColor, setSelectedColor] = useState<string | undefined>(product.attributes.colors ? product.attributes.colors[0] : undefined)
    const [selectedSize, setSelectedSize] = useState<string | number | undefined>(product.attributes.sizes ? product.attributes.sizes[0] : undefined)

    useEffect(() => {
        if (selectedColor !== undefined) {
            dispatch(changeProductColor({
                id: product.id,
                color: selectedColor
            }))
        }
    }, [selectedColor])

    useEffect(() => {
        if (selectedSize !== undefined) {
            dispatch(changeProductSize({
                id: product.id,
                size: selectedSize
            }))
        }
    }, [selectedSize])

    const handleReduceCount = useCallback(() => {
        dispatch(removeProduct(product))
    }, [dispatch, product])

    const handleIncreaseCount = useCallback(() => {
        dispatch(addProduct({
            product,
            size: product.attributes.sizes ? product.attributes.sizes[0] : undefined,
            color: product.attributes.colors ? product.attributes.colors[0] : undefined
        }));
    }, [dispatch, product])

    return (
        <DefaultLayout>
            <div className='w-full flex flex-col items-stretch'>
                <Head>
                    <title>{product.name}</title>
                </Head>
                <BreadcrumbSection
                    options={breadcrumb}/>
                <div className='Container pt-4 pb-8'>
                    <div className='flex flex-col justify-start items-stretch gap-2 p-2'>
                        <div className='flex flex-col px-12 py-4 gap-5 items-start justify-start'>
                            <p className='w-fit text-weef-white text-[40px] font-medium'>
                                <span>{product.category}</span> <span>{product.attributes.brand}</span></p>
                            <p className='w-fit text-weef-white text-2xl'>{product.name}</p>
                        </div>
                        <div className='flex items-start'>
                            <div className='flex flex-col items-stretch justify-start w-[calc(100%-480px)]'>
                                <div className='w-full'>
                                    {
                                        product.attributes.colors &&
                                        <div
                                            className='flex float-right min-w-[50%] h-14 items-center justify-start px-4 gap-4 self-start'>
                                                <span
                                                    className='text-weef-white whitespace-nowrap'>رنگ های موجود:</span>
                                            <div className='flex gap-1'>
                                                {
                                                    product.attributes.colors.map(color => (
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
                                        product.attributes.sizes &&
                                        <div
                                            className='flex float-left min-w-[50%] h-14 items-center justify-start px-4 gap-4 self-end'>
                                                <span
                                                    className='text-weef-white whitespace-nowrap'>سایز های موجود:</span>
                                            <div className='flex gap-1'>
                                                {
                                                    product.attributes.sizes.map(size => (
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
                                                className='text-weef-white font-extralight'>{product.price}</div>
                                            <div className='text-weef-white font-extralight'>ریال</div>
                                        </div>
                                    </div>
                                    <div
                                        className='flex float-left min-w-[50%] h-14 items-center justify-start px-4 self-end'>
                                        <MultiButton reduceCount={handleReduceCount}
                                                     increaseCount={handleIncreaseCount}
                                                     id={product.id}/>
                                    </div>
                                </div>
                                <div className='w-full gap-2 p-2 flex flex-col text-weef-white'>
                                    <div>مشخصات محصول:</div>
                                    <p>{product.description}</p>
                                </div>
                                <div className='w-full flex flex-col gap-2 py-2 items-start text-weef-white'>
                                    <div>از دید کاریران:</div>
                                    <div>
                                        <span>امتیاز:</span><span>{product.attributes.rating}</span><span>star</span>
                                    </div>
                                    <div>نظرات کاربران:</div>
                                    {
                                        product.description
                                    }
                                </div>
                            </div>
                            <div className='w-fit'>
                                <div
                                    className='rounded-full w-[480px] h-[480px] bg-primary p-0.5 overflow-hidden flex items-center justify-center'>
                                    <div className='w-full h-full bg-weef-black rounded-full overflow-hidden'>
                                        <Image objectFit={'cover'} width='478px' height='478px'
                                               src={product.main_image} alt={product.name}/>
                                    </div>
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

    const category: ICategory | undefined = categories.find(category => category.id === product.category)

    const productDetails = (category: ICategory | undefined): singleProductDetailsType => {
        const findCategoryById = (id: any): ICategory | undefined => {
            return categories.find(category => category.id === id)
        }
        const breadcrumb = [
            {
                name: 'صفحه اصلی',
                link: '/'
            },
            {
                name: category?.name || 'category',
                link: `/Category/${category?.parent?.slug}/${category?.slug}`
            },
            {
                name: product.name,
                link: `/Category/${findCategoryById(category?.parent)?.slug}/${category?.slug}/${product.slug}`,
                disable: true
            }
        ]
        return {
            product:
                {
                    ...product,
                    price: _3DigitSeparator(product?.price),
                },
            breadcrumb
        }
    };

    return {
        props: {
            singleProductDetails: productDetails(category),
            similarProducts
        }
    }
}

export default SingleProduct;