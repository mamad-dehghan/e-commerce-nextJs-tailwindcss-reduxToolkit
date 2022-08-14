import React, {useCallback, useEffect, useMemo, useReducer, useRef, useState} from 'react';
import Head from "next/head";
import DefaultLayout from "../../../../layouts/DefaultLayout";
import CategorySelect from "../../../../components/common/CategorySelect";
import MultiSelect from "../../../../components/common/MultiSelect";
import ColorMultiSelect from "../../../../components/common/ColorMultiSelect";
import SearchInput from '../../../../components/common/SearchInput';
import CardsWrapper from "../../../../components/costum/CardsWrapper";
import PriceRange from "../../../../components/common/PriceRange";
import {useRouter} from "next/router";
import axios from "axios";
import _3DigitSeparator from "../../../../utilities/functions/_3DigitSeparator";
import IProduct from "../../../../interfaces/product";
import ICategory from "../../../../interfaces/category";
import parse3DigitNumber from "../../../../utilities/functions/parse3DigitNumber";
import style from './style.module.scss'


type productDetailsType = {
    brands: string[],
    colors: string[],
    sizes: string [],
    minPrice: number,
    maxPrice: number
}

type categoryDetailsType = {
    name: string,
    siblingCategories: {
        name: string,
        slug: string,
        parent: ICategory | undefined
    }[],
    currentCategory: ICategory
}

type props = {
    products: IProduct[],
    productsDetails: productDetailsType,
    categoryDetails: categoryDetailsType
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

enum sortEnum {
    default,
    cheapest,
    most_expensive,
    newest,
    oldest,
    most_popular,
    most_rating
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
            return {...state, price: action.value}
        case filterEnum.size:
            return {...state, size: action.value}
        default:
            throw new Error();
    }
}

const SubCategory = ({products, categoryDetails, productsDetails}: props) => {
    const router = useRouter();
    const searchInput = useRef<HTMLDivElement>(null);
    const contentRight = useRef<HTMLDivElement>(null);
    const contentLeft = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);
    const fixHeight = useCallback(() => {
        contentRight && contentRight.current && contentLeft && contentLeft.current && setHeight(Math.max(contentLeft.current.clientHeight, contentRight.current.clientHeight,))
    }, []);

    const [filter, filterDispatch] = useReducer(filterReducer, {brand: [], size: [], color: [], price: [0, 0]})
    const [sort, setSort] = useState<sortEnum>(sortEnum.default);
    const [page, setPage] = useState<number>(1);
    // @ts-ignore
    const [searchValue, setSearchValue] = useState<string>(router.query.search || '');

    const handleSearch = useCallback(async (e: string) => {
        if (e.length === 0) {
            if (searchValue.length < 3)
                await router.replace(`/Category/${router.query.MainCategory}/${router.query.SubCategory}`, undefined, {shallow: true});
            else {
                await router.replace(`/Category/${router.query.MainCategory}/${router.query.SubCategory}`, undefined, {shallow: false});
                setPage(1);
            }
        } else if (e.length < 3) {
            if (searchValue.length < 3)
                await router.replace(`/Category/${router.query.MainCategory}/${router.query.SubCategory}?search=${e}`, undefined, {shallow: true});
            else {
                await router.replace(`/Category/${router.query.MainCategory}/${router.query.SubCategory}?search=${e}`, undefined, {shallow: false});
                setPage(1);
            }
        } else {
            await router.replace(`/Category/${router.query.MainCategory}/${router.query.SubCategory}?search=${e}`, undefined, {shallow: false});
            setPage(1);
        }
        setSearchValue(e)
    }, [router, searchValue])

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

    const filterProducts = useMemo(() => {
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
        const filterProductsPrice: IProduct[] = filterProductsSize.filter(item => (parse3DigitNumber(item.final_price) >= filter.price[0] && parse3DigitNumber(item.final_price) <= filter.price[1]));
        return filterProductsPrice;
    }, [products, filter]);

    const sortProducts = useMemo(() => {
        let sortProductsTemp;
        switch (sort) {
            case sortEnum.default:
                sortProductsTemp = filterProducts.sort(() => Math.random() - 0.5);
                break;
            case sortEnum.cheapest:
                sortProductsTemp = filterProducts.sort((a, b) => parseInt(a.final_price) - parseInt(b.final_price));
                break
            case sortEnum.most_expensive:
                sortProductsTemp = filterProducts.sort((a, b) => parseInt(b.final_price) - parseInt(a.final_price));
                break;
            case sortEnum.most_rating:
                sortProductsTemp = filterProducts.sort((a, b) => b.attributes.rating - a.attributes.rating);
                break;
            default:
                sortProductsTemp = filterProducts.sort(() => Math.random() - 0.5);
        }
        return sortProductsTemp;
    }, [filterProducts, sort]);

    const pageProducts = useMemo(() => {
        const pageSize: number = 3;
        const pagesCount: number = sortProducts.length;
        const maxPage: number = Math.max(1, Math.ceil(pagesCount / pageSize));
        const minIndex: number = (page - 1) * pageSize;
        const maxIndex: number = Math.min(sortProducts.length + 1, page * pageSize);
        const pages: number[] = [];

        for (let i = page - 2; i <= page + 2; i++)
            if ((i >= 1) && (i <= maxPage))
                pages.push(i);

        return {
            totalCount: sortProducts.length,
            minPage: 1,
            maxPage,
            pages,
            products: sortProducts.slice(minIndex, maxIndex),
        }
    }, [sortProducts, page, sort]);

    useEffect(() => {
        setPage(1)
    }, [filter, sort]);

    useEffect(() => {
        searchInput.current && searchInput.current.scrollIntoView();
    }, [page]);

    useEffect(() => {
        fixHeight();
    }, [contentLeft, contentRight, pageProducts]);

    return (
        <DefaultLayout>
            <div className='w-full flex flex-row h-full grow'>
                <Head>
                    <title>{categoryDetails.name}</title>
                </Head>
                <div style={{minHeight: height, willChange: 'height'}} ref={contentRight}
                     className='h-full bg-weef-black w-[24rem]'>
                    <div
                        onClick={fixHeight}
                        className='bg-weef-black sticky top-[66px] w-[384px] h-full flex flex-col justify-start px-8 pt-8 pb-16 gap-4'>
                        <CategorySelect
                            position='relative'
                            options={categoryDetails.siblingCategories}
                            title={categoryDetails.currentCategory?.name}/>
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
                    <div ref={searchInput}
                         className='relative h-[7.5rem] bg-weef-secondary-light overflow-hidden flex py-8 pl-8 pr-16'>
                        <div
                            className='absolute rounded-full bg-weef-black w-[345px] h-[345px] -top-[188px] -left-[92px]'/>
                        <SearchInput itemType='search' initial={searchValue} onChange={handleSearch}
                                     placeholder='جست‌و‌جو در دسته بندی'/>
                    </div>
                    <div className='h-20 bg-weef-black'>
                        <div className={style.filterSection}>
                                <span
                                    className='text-weef-white whitespace-nowrap order-first'>مرتب سازی بر اساس:</span>
                            <a onClick={() => {
                                setSort(sortEnum.most_popular)
                            }}
                               className={`whitespace-nowrap ${sort === sortEnum.most_popular ? 'text-transparent bg-clip-text bg-primary order-first' : 'link'}`}
                            >پرفروش ترین</a>
                            <a onClick={() => {
                                setSort(sortEnum.most_rating)
                            }}
                               className={`whitespace-nowrap ${sort === sortEnum.most_rating ? 'text-transparent bg-clip-text bg-primary order-first' : 'link'}`}
                            >بیش ترین امتیاز</a>
                            <a onClick={() => {
                                setSort(sortEnum.most_expensive)
                            }}
                               className={`whitespace-nowrap ${sort === sortEnum.most_expensive ? 'text-transparent bg-clip-text bg-primary order-first' : 'link'}`}
                            >گران ترین</a>
                            <a onClick={() => {
                                setSort(sortEnum.cheapest)
                            }}
                               className={`whitespace-nowrap ${sort === sortEnum.cheapest ? 'text-transparent bg-clip-text bg-primary order-first' : 'link'}`}
                            >ارزان ترین</a>
                        </div>
                    </div>
                    <CardsWrapper products={pageProducts.products}/>
                    <div
                        className='relative w-full bg-weef-black h-20 flex items-center justify-start px-32 overflow-hidden'>
                        <div
                            className='absolute w-[345px] h-[345px] -left-[47px] -top-[74px] bg-weef-secondary-light rounded-full'/>
                        <div
                            className='bg-primary flex items-center justify-start gap-[1px] p-[1px] rounded z-10'>
                            <button
                                key='first'
                                disabled={page === pageProducts.minPage}
                                onClick={() => setPage(pageProducts.minPage)}
                                className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary rounded-r'>ابتدا
                            </button>
                            {
                                pageProducts.pages.map(item => (
                                    <button
                                        key={item}
                                        disabled={page === item}
                                        onClick={() => setPage(item)}
                                        className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary'>{item}
                                    </button>
                                ))
                            }
                            <button
                                key='last'
                                disabled={page === pageProducts.maxPage}
                                onClick={() => setPage(pageProducts.maxPage)}
                                className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary rounded-l'>انتها
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export async function getServerSideProps(input: any) {
    const categories: ICategory[] = await axios('http://localhost:8000/store/category')
        .then((res: any) => res.data);

    const categoryDetails = () => {
        const findCategoryById = (id: any): ICategory | undefined => {
            return categories.find(item => item.id === id)
        }
        const subCategory: ICategory | undefined = categories.find(item => item.slug === input.query.SubCategory)
        const mainCategory = subCategory?.parent;
        const siblingCategories = mainCategory?.children?.map(item => {
            return {
                name: item.name,
                slug: item.slug,
                parent: findCategoryById(item.parent)
            }
        })
        return {
            name: subCategory?.name,
            siblingCategories,
            currentCategory: subCategory
        }
    }

    let categoryProducts: IProduct[] = await axios(`http://localhost:8000/store/product/category/slug/${input.query.SubCategory}`)
        .then((res: any) => res.data);

    categoryProducts = categoryProducts.map(item => {
        return {
            ...item,
            final_price: _3DigitSeparator(item.final_price),
            price: _3DigitSeparator(item.price)
        }
    })

    const searchProducts: IProduct[] = await axios(`http://localhost:8000/store/product/search/?search=${input.query.search}`)
        .then((res: any) => res.data);

    let searchProductsCategory: IProduct[] = searchProducts.filter(item => item.category === categoryDetails().currentCategory?.id);

    searchProductsCategory = searchProductsCategory.map(item => {
        return {
            ...item,
            final_price: _3DigitSeparator(item.final_price),
            price: _3DigitSeparator(item.price)
        }
    })

    const productsDetails = (products: IProduct[]): productDetailsType => {
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
            const price = parse3DigitNumber(item.final_price);
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
    }
    const searchIsAvailable = input.query.search ? input.query.search.length > 2 : false;

    return (
        {
            props: {
                products: searchIsAvailable ? searchProductsCategory : categoryProducts,
                categoryDetails: categoryDetails(),
                productsDetails: productsDetails(categoryProducts)
            }
        }
    )
}

export default SubCategory;