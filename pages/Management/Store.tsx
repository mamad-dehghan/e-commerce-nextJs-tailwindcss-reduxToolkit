import React, {useCallback, useEffect, useMemo, useState} from 'react';
import RotatedButton from "../../components/common/RotatedButton";
import IProduct from "../../interfaces/product";
import {getAllProducts} from "../../utilities/functions/ApiCall/products";
import ManagementStoreItem from "../../components/costum/Management/ManagementStoreItem";
import SortIcon from "../../utilities/icons/SortIcon";
import Pagination from "../../components/costum/Pagination";
import Head from "next/head";
import Button from "../../components/common/Button";
import ManagementLayout, {ManagementWrapper} from "../../layouts/ManagementLayout";
import DefaultLayout from "../../layouts/DefaultLayout";

enum sortEnum {
    price_asc = 'price_asc',
    price_desc = 'price_desc',
    remaining_asc = 'remaining_asc',
    remaining_desc = 'remaining_desc',
    name_asc = 'name_asc',
    name_desc = 'name_desc',
    final_price_desc = 'final_price_desc',
    final_price_asc = 'final_price_asc'
}

const ManagementStore = () => {
    const [forceSubmit, submitAll] = useState<boolean>(false)
    const [products, setProducts] = useState<IProduct[]>([])
    const [sort, setSort] = useState<sortEnum>(sortEnum.name_asc)
    const [page, setPage] = useState<number>(1)

    // [false=> asc \ true=> desc  ,  false=>notSelect \ true=>select]
    const [sortRemaining, setSortRemaining] = useState<[boolean, boolean]>([false, false])
    const [sortName, setSortName] = useState<[boolean, boolean]>([true, true])
    const [sortPrice, setSortPrice] = useState<[boolean, boolean]>([false, false])
    const [sortFinalPrice, setSortFinalPrice] = useState<[boolean, boolean]>([false, false])
    console.log('ManagementStore')
    const handleClickSortName = useCallback(() => {
        setSortRemaining(([first,]) => [first, false])
        setSortPrice(([first,]) => [first, false])
        setSortFinalPrice(([first,]) => [first, false])
        setSortName(([first, second]) => [second ? !first : first, true])
    }, [])

    const handleClickSortRemaining = useCallback(() => {
        setSortPrice(([first,]) => [first, false])
        setSortName(([first,]) => [first, false])
        setSortFinalPrice(([first,]) => [first, false])
        setSortRemaining(([first, second]) => [second ? !first : first, true])
    }, [])

    const handleClickSortPrice = useCallback(() => {
        setSortRemaining(([first,]) => [first, false])
        setSortName(([first,]) => [first, false])
        setSortFinalPrice(([first,]) => [first, false])
        setSortPrice(([first, second]) => [second ? !first : first, true])
    }, [])

    const handleClickSortFinalPrice = useCallback(() => {
        setSortRemaining(([first,]) => [first, false])
        setSortName(([first,]) => [first, false])
        setSortPrice(([first,]) => [first, false])
        setSortFinalPrice(([first, second]) => [second ? !first : first, true])
    }, [])

    useEffect(() => {
        if (sortName[1]) {
            if (sortName[0])
                setSort(sortEnum.name_asc)
            else
                setSort(sortEnum.name_desc)
        } else if (sortRemaining[1]) {
            if (sortRemaining[0])
                setSort(sortEnum.remaining_asc)
            else
                setSort(sortEnum.remaining_desc)
        } else if (sortPrice[1]) {
            if (sortPrice[0])
                setSort(sortEnum.price_asc)
            else
                setSort(sortEnum.price_desc)
        } else if (sortFinalPrice[1]) {
            if (sortFinalPrice[0])
                setSort(sortEnum.final_price_asc)
            else
                setSort(sortEnum.final_price_desc)
        }
    }, [sortName, sortPrice, sortRemaining])

    useEffect(() => {
        getAllProducts()
            .then(([status, response]) => {
                if (status)
                    setProducts(response)
            })
    }, [])

    const sortProducts: IProduct[] = useMemo(() => {
        switch (sort) {
            case sortEnum.name_asc:
                return products.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0)
            case sortEnum.name_desc:
                return products.sort((a, b) => b.name.toLowerCase() < a.name.toLowerCase() ? -1 : b.name.toLowerCase() > a.name.toLowerCase() ? 1 : 0)
            case sortEnum.remaining_asc:
                return products.sort((a, b) => a.remaining - b.remaining)
            case sortEnum.remaining_desc:
                return products.sort((a, b) => b.remaining - a.remaining)
            case sortEnum.price_asc:
                return products.sort((a: any, b: any) => a.price - b.price)
            case sortEnum.price_desc:
                return products.sort((a: any, b: any) => b.price - a.price)
            case sortEnum.final_price_asc:
                return products.sort((a: any, b: any) => a.final_price - b.final_price)
            case sortEnum.final_price_desc:
                return products.sort((a: any, b: any) => b.final_price - a.final_price)
            default:
                return products.sort((a, b) => b.category - a.category)
        }
    }, [products, sort])


    const pageProducts = useMemo(() => {
        const pageSize: number = 5;
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
    }, [page, sortProducts, sort])

    useEffect(() => {
        setPage(1)
    }, [sort])

    const handleSubmit = useCallback((information: any) => {
        setProducts(prevState =>
            prevState.map(item => {
                if (item.id === information.id)
                    return {...item, ...information}
                return item

            }))
    }, [products])

    return (
        <>
            <Head><title>مدیریت موجودی‌ها</title></Head>
            <div
                className='w-full bg-weef-black z-30 bg-primary p-0.5 gap-0.5 rounded-xl flex flex-col items-stretch'>
                <div
                    className='w-full h-[6.5rem] bg-weef-black flex items-center justify-between rounded-t-xl py-6 pl-28 pr-20'>
                    <div className='flex items-center justify-center gap-4 w-[20%]'>
                        <div className='text-weef-white text-center'>نام محصول</div>
                        <RotatedButton onClick={handleClickSortName}
                                       heightOnPx={80} background='linear' key={1}>
                            <SortIcon active={sortName[1]} asc={!sortName[0]}/>
                        </RotatedButton>
                    </div>
                    <div className='flex items-center justify-center gap-4 w-[25%]'>
                        <div className='text-weef-white text-center'>موجودی محصول</div>
                        <RotatedButton onClick={handleClickSortRemaining}
                                       heightOnPx={80} background='linear' key={2}>
                            <SortIcon active={sortRemaining[1]} asc={!sortRemaining[0]}/>
                        </RotatedButton>
                    </div>
                    <div className='flex items-center justify-center gap-4 w-[25%]'>
                        <div className='text-weef-white text-center'>قیمت محصول</div>
                        <RotatedButton onClick={handleClickSortPrice}
                                       heightOnPx={80} background='linear' key={3}>
                            <SortIcon active={sortPrice[1]} asc={!sortPrice[0]}/>
                        </RotatedButton>
                    </div>
                    <div className='flex items-center justify-center gap-4 w-[25%]'>
                        <div className='text-weef-white text-center'>قیمت نهایی محصول</div>
                        <RotatedButton onClick={handleClickSortFinalPrice}
                                       heightOnPx={80} background='linear' key={4}>
                            <SortIcon active={sortFinalPrice[1]} asc={!sortFinalPrice[0]}/>
                        </RotatedButton>
                    </div>
                </div>
                <div
                    className='w-full h-[510px] flex flex-col bg-weef-black items-center gap-3 py-4 justify-between rounded-b-xl'>
                    <div className='flex flex-col items-center justify-start w-full px-20 py-2 gap-1 grow'>
                        {
                            pageProducts.products.map((product: IProduct) =>
                                <ManagementStoreItem product={product} handleSubmit={handleSubmit}
                                                     forceSubmit={forceSubmit}
                                                     key={`${product.id}/${product.final_price}/${product.price}/${product.remaining}`}/>
                            )
                        }
                    </div>
                    <div className='w-full flex items-center justify-between py-2 px-10'>
                        <Pagination currentPage={page} setPage={setPage} pages={pageProducts.pages}
                                    maxPage={pageProducts.maxPage} minPage={pageProducts.minPage}/>
                        <div/>
                        <Button type='button' onClick={() => submitAll(prevState => !prevState)} size='medium'>
                            ثبت همه
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
ManagementStore.getLayout = function getLayout(page: any) {
    return (
        <ManagementWrapper>
            <ManagementLayout>
                {page}
            </ManagementLayout>
        </ManagementWrapper>
    )
}

export default ManagementStore;