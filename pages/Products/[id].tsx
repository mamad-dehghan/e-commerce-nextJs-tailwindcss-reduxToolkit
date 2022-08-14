import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import Head from "next/head";
import Image from 'next/image'
import DefaultLayout from "../../layouts/DefaultLayout";
import BreadcrumbSection from "../../components/costum/BreadcrumbSection";
import Section from "../../components/costum/Section";
import MultiButton from "../../components/common/MultiButton";
import _3DigitSeparator from "../../utilities/functions/_3DigitSeparator";
import axios from "axios";
import IProduct from "../../interfaces/product";
import ICategory from "../../interfaces/category";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, changeProductColor, changeProductSize, removeProduct} from "../../redux/slices/BasketSlice";
import {useRouter} from "next/router";


type breadcrumbType = {
    link: string,
    name: string,
    disable?: boolean
}

type singleProductDetailsType = {
    product: IProduct,
    breadcrumb: breadcrumbType[],
    category: ICategory | undefined
}

type props = {
    singleProductDetails: singleProductDetailsType,
    similarProducts: IProduct[]
}

const SingleProduct = ({singleProductDetails: {product, breadcrumb, category}, similarProducts}: props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {products} = useSelector((state:any) => state.BasketSlice)

    const initialAttribute = useMemo(()=>{
        const index:number = products.findIndex((item:any)=>item.product.id == router.query.id);
        if (index === -1){
            return {
                color: product.attributes.colors ? product.attributes.colors[0] : undefined,
                size:product.attributes.sizes ? product.attributes.sizes[0] : undefined
            }
        }else {
            return {
                color: products[index].attribute.color,
                size:products[index].attribute.size
            }
        }
    },[])
    // console.log(initialAttribute)
    const [selectedColor, setSelectedColor] = useState<string | undefined>(initialAttribute.color);
    const [selectedSize, setSelectedSize] = useState<string | number | undefined>(initialAttribute.size);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    useLayoutEffect(() => {
        setSelectedImage(0)
        return () => {
            setSelectedImage(0)
        }
    }, [product])

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
                <div className='Container pt-4 pb-8 overflow-hidden'>
                    <div className='w-full flex items-center md:items-start flex-col-reverse md:flex-row'>
                        <div
                            className='flex flex-col items-stretch justify-start self-stretch md:self-start grow gap-2 '>
                            <div className='flex flex-col px-8 py-4 gap-5 items-start justify-start'>
                                <p className='w-full text-center md:w-fit text-weef-white text-[40px] font-medium'>
                                    <span>{category?.name}</span> <span>{product.attributes.brand}</span></p>
                                <p className='w-full text-center md:w-fit text-weef-white text-2xl'>
                                    <span>مدل</span> {product.name}</p>
                            </div>
                            <div className='flex items-start'>
                                <div className='flex flex-col items-stretch justify-start w-full'>
                                    <div className='w-full'>
                                        {
                                            product.attributes.colors &&
                                            <div
                                                className='flex float-right min-w-[50%] h-14 items-center justify-center md:justify-start px-4 gap-4 self-start'>
                                                <span
                                                    className='text-weef-white whitespace-nowrap'>رنگ های موجود:</span>
                                                <div className='flex gap-1'>
                                                    {
                                                        product.attributes.colors.map(color => (
                                                            <div key={color}
                                                                 onClick={() => setSelectedColor(color)}
                                                                 style={{backgroundColor: color}}
                                                                 className={`w-9 h-9 rounded-full cursor-pointer ${selectedColor===color?'border-2 border-primary-red':'hover:border hover:border-primary-orange'}`}/>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                        {
                                            product.attributes.sizes &&
                                            <div
                                                className='flex float-left min-w-[50%] h-14 items-center justify-center md:justify-start px-4 gap-4 self-end'>
                                                <span
                                                    className='text-weef-white whitespace-nowrap'>سایز های موجود:</span>
                                                <div className='flex gap-1 items-center'>
                                                    {
                                                        product.attributes.sizes.map(size => (
                                                            <div key={size}
                                                                 onClick={() => setSelectedSize(size)} className={`cursor-pointer rounded-sm transition-all duration-300 ${selectedSize === size ? 'p-0.5 bg-primary-red' : 'p-[1px] hover:bg-primary-orange'}`}>
                                                            <div
                                                                 className={`w-5 h-5 flex items-center justify-center rounded-sm bg-weef-white text-weef-black `}>
                                                                {size}
                                                            </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='w-full'>
                                        <div
                                            className='flex float-right min-w-[50%] h-14 items-center justify-center md:justify-start px-4 gap-8 self-start'>
                                            <div className='text-weef-white'>قیمت:</div>
                                            <div className='flex items-center gap-2'>
                                                <div
                                                    className='text-weef-white font-extralight'>{product.price}</div>
                                                <div className='text-weef-white font-extralight'>ریال</div>
                                            </div>
                                        </div>
                                        <div
                                            className='flex float-left min-w-[50%] h-14 items-center justify-center md:justify-start px-4 self-end'>
                                            <MultiButton reduceCount={handleReduceCount}
                                                         increaseCount={handleIncreaseCount}
                                                         id={product.id}/>
                                        </div>
                                    </div>
                                    <div className='w-full gap-2 p-2 px-4 flex flex-col text-weef-white'>
                                        <div>مشخصات محصول:</div>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className='w-full flex flex-col gap-2 py-2 px-4 items-start text-weef-white'>
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
                            </div>
                        </div>
                        <div className='w-fit w-full flex justify-end md:w-[420px] lg:w-[480px]'>
                            <div
                                className='relative w-full md:w-fit flex  flex-col items-center h-fit overflow-visible md:scale-75 lg:scale-100'>
                                {
                                    product.images.length > 1 &&
                                    <>
                                        <div
                                            className='md:hidden w-full flex items-center gap-4 py-2 justify-center overflow-y-auto'>
                                            {
                                                product.images.map((item: string, index: number) => (
                                                    <div key={index}
                                                         className='shrink-0 w-24 h-24 rounded-full bg-primary p-[1px]'>
                                                        <div
                                                            className='w-full h-full bg-weef-black rounded-full overflow-hidden cursor-pointer'
                                                            onClick={() => setSelectedImage(index)}>
                                                            <Image objectFit={'cover'} width='94px' height='94px'
                                                                   quality={25}
                                                                   src={item} alt={product.name}/>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='hidden md:block w-full pb-24 order-last'/>
                                        <div
                                            className='hidden md:block absolute top-1/2 left-1/2 w-[480px] h-[480px] -translate-x-1/2 -translate-y-[calc(50%+48px)]'>
                                            {
                                                product.images.map((item: string, index: number) => (
                                                    <div key={index}
                                                         className='absolute top-0 left-0 w-[480px] h-[480px] z-30 rounded-full'
                                                         style={{transform: `rotate(${34 - (index) * 22}deg)`}}>
                                                        <div
                                                            className='absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-primary p-[1px] translate-y-[260px] z-50 -translate-x-1/2'>
                                                            <div
                                                                className='w-full h-full bg-weef-black rounded-full overflow-hidden cursor-pointer z-50'
                                                                onClick={() => setSelectedImage(index)}
                                                                style={{transform: `rotate(${(index) * 22 - 34}deg)`}}>
                                                                <Image objectFit={'cover'} width='94px' height='94px'
                                                                       quality={25}
                                                                       src={item} alt={product.name}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                }
                                <div
                                    className='rounded-full w-[480px] h-[480px] bg-primary p-0.5 overflow-hidden flex items-center justify-center'>
                                    <div className='w-full h-full bg-weef-black rounded-full overflow-hidden'>
                                        <Image objectFit={'cover'} width='478px' height='478px'
                                               src={product.images[selectedImage] || product.main_image}
                                               alt={product.name} quality={100}/>
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

    let similarProducts: IProduct[] = await axios('http://localhost:8000/store/product')
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
                    final_price: _3DigitSeparator(product?.final_price),
                    images: product.images ? [product.main_image, ...product.images] : [product.main_image]
                },
            breadcrumb,
            category: findCategoryById(product.category)
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