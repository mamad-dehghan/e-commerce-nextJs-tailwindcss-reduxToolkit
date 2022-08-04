import React, {useCallback, useLayoutEffect, useMemo, useReducer, useRef, useState} from 'react';
import Head from "next/head";
import {useRouter} from "next/router";
import DefaultLayout from "../../../../layouts/DefaultLayout";
import CategorySelect from "../../../../components/common/CategorySelect";
import MultiSelect from "../../../../components/common/MultiSelect";
import ColorMultiSelect from "../../../../components/common/ColorMultiSelect";
import CardsWrapper from "../../../../components/costum/CardsWrapper";
import PriceRange from "../../../../components/common/PriceRange";
import axios from "axios";
import IProduct from "../../../../interfaces/IProduct";
import ICategory from "../../../../interfaces/ICategory";

type props = {
    products: IProduct[],
    categories: ICategory[],
    category: ICategory
}

type filter = {
    brand: string[],
    color: string[],
    size: string[] | number[],
    price: [number, number]
}

export enum filterEnum {
    brand,
    color,
    size,
    price
}

type actionType = {
    type: filterEnum,
    value: any
}


const filterReducer = (state: filter, action: actionType) => {
    switch (action.type) {
        case filterEnum.brand:
            return {...state, brand: action.value}
        case filterEnum.color:
            return {...state, color: action.value}
        case filterEnum.price:
            // const tempPrice = action.value;
            return {...state, price: action.value}
        case filterEnum.size:
            return {...state, size: action.value}
        default:
            throw new Error();
    }
}

const SubCategory = ({products, categories, category}: props) => {
    const router = useRouter();
    const contentRight = useRef<HTMLDivElement>(null);
    const contentLeft = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);
    const fixHeight = useCallback(() => {
        contentRight && contentRight.current && contentLeft && contentLeft.current && setHeight(Math.max(contentLeft.current.clientHeight, contentRight.current.clientHeight,))
    }, []);
    useLayoutEffect(() => {
        fixHeight();
    }, [contentLeft, contentRight]);

    const categoryDetails = useMemo(() => {
        const findCategoryById = (id: any): ICategory | undefined => {
            return categories.find(item => item.id === id)
        }
        const subCategory: ICategory | undefined = categories.find(item => item.slug === router.query.SubCategory)
        const mainCategory = subCategory?.parent;
        // const b = a?.parent;
        // const levelOneCategories = b?.children?.map(item => {
        //     return {
        //         name: item.name,
        //         slug: item.slug,
        //         parent: findCategoryById(item.parent)
        //     }
        // })
        const levelTwoCategories = mainCategory?.children?.map(item => {
            return {
                name: item.name,
                slug: item.slug,
                parent: findCategoryById(item.parent)
            }
        })
        return {
            name: subCategory?.name,
            // levelOneCategories,
            // levelOneCurrent: a,
            levelTwoCategories,
            levelTwoCurrent: subCategory
        }
    }, [category])

    const productsDetails = useMemo(() => {
        const allBrands: string[] = products.map(item => item.attributes.brand);
        const uniqueBrands = allBrands.filter((item, index) => !allBrands.includes(item, index + 1))

        const allColors: any[] = products.map(item => item.attributes.colors)
        const flatAllColors = [].concat.apply([], allColors);
        const uniqueColors = flatAllColors.filter((item, index) => !flatAllColors.includes(item, index + 1)).sort((a, b) => a - b)

        const allSizes: any[] = products.map(item => item.attributes.sizes)
        const flatAllSizes = [].concat.apply([], allSizes);
        const uniqueSizes = flatAllSizes.filter((item, index) => !flatAllSizes.includes(item, index + 1)).sort((a, b) => a - b)

        let maxPrice: number = 0;
        let minPrice: number = Infinity;
        products.forEach(item => {
            const price = parseInt(item.price);
            if (price > maxPrice)
                maxPrice = price;
            if (price < minPrice)
                minPrice = price
        })
        return {
            brands: uniqueBrands,
            colors: uniqueColors,
            sizes: uniqueSizes,
            minPrice,
            maxPrice
        }
    }, [products])

    const [filter, filterDispatch] = useReducer(filterReducer, {brand: [], size: [], color: [], price: [0, 0]})

    const handleChangeBrands = useCallback((value: any) => {
        filterDispatch({type: filterEnum.brand, value: [...value]})
    }, [])

    const handleChangeColors = useCallback((value: any) => {
        filterDispatch({type: filterEnum.color, value})
    }, [])

    const handleChangeSizes = useCallback((value: any) => {
        filterDispatch({type: filterEnum.size, value: [...value]})
    }, [])

    const handleChangePrice = useCallback((value: any) => {
        filterDispatch({type: filterEnum.price, value: [...value]})
    }, [])

    useLayoutEffect(() => {
        console.log(filter)
    }, [filter])

    const filterProducts = useMemo(() => {
        console.log(filter.price)
        const filterProductsBrand: IProduct[] = filter.brand.length === 0 ? products : products.filter((item: IProduct) => filter.brand.includes(item.attributes.brand));
        const filterProductsColor: IProduct[] = filter.color.length === 0 ? filterProductsBrand : filterProductsBrand.filter((item: IProduct) => {
            let contain: boolean = false;
            for (const colorFilterItem of filter.color) {
                if (item.attributes.colors?.includes(colorFilterItem)) {
                    contain = true;
                    break;
                }
            }
            return contain;
        });
        const filterProductsSize: IProduct[] = filter.size.length === 0 ? filterProductsColor : filterProductsColor.filter((item: IProduct) => {
            let contain: boolean = false;
            for (const sizeFilterItem of filter.size) {
                // @ts-ignore
                if (item.attributes.sizes?.includes(sizeFilterItem)) {
                    contain = true;
                    break;
                }
            }
            return contain;
        })
        const filterProductsPrice: IProduct[] = filterProductsSize.filter(item => (item.final_price >= filter.price[0] && item.final_price <= filter.price[1]));
        return filterProductsPrice;
    }, [ products, filter])


    return (
        <>
            <Head>
                <title>{categoryDetails.name}</title>
            </Head>
            <DefaultLayout>
                <div className='w-full flex flex-row h-full grow'>
                    <div style={{minHeight: height}} ref={contentRight} className='h-full bg-weef-black w-[24rem]'>
                        <div
                            onClick={fixHeight}
                            className='bg-weef-black sticky top-[66px] w-[384px] h-full flex flex-col justify-start px-8 pt-8 pb-16 gap-4'>

                            <CategorySelect
                                position='relative'
                                options={categoryDetails.levelTwoCategories}
                                initialValue={categoryDetails.levelTwoCurrent?.name}/>
                            <MultiSelect
                                onChange={handleChangeBrands}
                                position='relative'
                                options={productsDetails.brands}
                                title='برند'/>
                            <ColorMultiSelect
                                onChange={handleChangeColors}
                                position='relative'
                                options={productsDetails.colors}
                                initialValues={[]}
                                title='رنگ بندی'/>
                            <MultiSelect
                                onChange={handleChangeSizes}
                                position='relative'
                                options={productsDetails.sizes}
                                title='سایز بندی'/>
                            <PriceRange
                                min={productsDetails.minPrice}
                                max={productsDetails.maxPrice}
                                initialValue={[productsDetails.minPrice, productsDetails.maxPrice]}
                                handleChange={handleChangePrice}/>
                        </div>
                    </div>
                    <div
                        ref={contentLeft} style={{minHeight: height}}
                        className='flex h-full w-full flex-col overflow-x-hidden items-stretch justify-start py-16 gap-4'>
                        <div
                            className='relative h-[7.5rem] bg-weef-secondary-light overflow-hidden flex py-8 pl-8 pr-16'>
                            <div
                                className='absolute rounded-full bg-weef-black w-[345px] h-[345px] -top-[188px] -left-[92px]'/>
                            {/*<SearchInput placeholder='search'/>*/}
                            <div className='w-full h-full bg-secondary z-10 rounded'/>
                        </div>
                        <div
                            className='h-20 bg-weef-black flex flex-row items-center justify-start overflow-x-auto px-16 gap-16'>
                            <span className='text-weef-white'>مرتب سازی بر اساس:</span>
                            <span className='link'>پرفروش ترین</span>
                            <span className='link'>ارزان ترین</span>
                            {/*<span></span>*/}
                            {/*<span></span>*/}
                        </div>
                        <CardsWrapper products={filterProducts}/>
                        <div
                            className='relative w-full bg-weef-black h-20 flex items-center justify-start px-32 overflow-hidden'>
                            <div
                                className='absolute w-[345px] h-[345px] -left-[47px] -top-[74px] bg-weef-secondary-light rounded-full'/>
                            <div dir='ltr'
                                 className='bg-primary flex items-center justify-start gap-[1px] p-[1px] rounded z-10'>
                                <button
                                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary rounded-l'>First
                                </button>
                                <button
                                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary '>3
                                </button>
                                <button
                                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary '>4
                                </button>
                                <button
                                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary '
                                    disabled={true}>5
                                </button>
                                <button
                                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary '>6
                                </button>
                                <button
                                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary '>7
                                </button>
                                <button
                                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary rounded-r'>Last
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}

export default SubCategory;


export async function getServerSideProps(input: any) {
    let categoryProducts: IProduct[] = await axios(`http://localhost:8000/store/product/category/slug/${input.query.SubCategory}`)
        .then((res: any) => res.data);

    let categories: ICategory[] = await axios('http://localhost:8000/store/category')
        .then((res: any) => res.data);

    const category = categories.find(category => category.slug === input.query.SubCategory);

    return (
        {
            props: {
                products: categoryProducts,
                categories,
                category
            }
        }
    )
}