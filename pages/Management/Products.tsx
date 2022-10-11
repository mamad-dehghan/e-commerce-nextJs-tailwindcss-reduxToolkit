import React, {useCallback, useEffect, useMemo, useState} from 'react';
import RotatedButton from "../../components/common/RotatedButton";
import Button from "../../components/common/Button";
import IProduct from "../../interfaces/product";
import {getAllProducts} from "../../utilities/functions/ApiCall/products";
import ManagementProductItem from "../../components/costum/Management/ManagementProductItem";
import SortIcon from "../../utilities/icons/SortIcon";
import AddProductModal from "../../components/costum/Management/AddProductModal";
import Pagination from "../../components/costum/Pagination";
import Head from "next/head";
import ManagementLayout from "../../layouts/ManagementLayout";

enum sortEnum {
    price_asc = 'price_asc',
    price_desc = 'price_desc',
    category_asc = 'category_asc',
    category_desc = 'category_desc',
    name_asc = 'name_asc',
    name_desc = 'name_desc'
}

const ManagementProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [sort, setSort] = useState<sortEnum>(sortEnum.name_asc)
    const [page, setPage] = useState<number>(1)
    const [openModal, setOpenModal] = useState<boolean>(false)

    // [false=> asc \ true=> desc  ,  false=>notSelect \ true=>select]
    const [sortCategory, setSortCategory] = useState<[boolean, boolean]>([false, false])
    const [sortName, setSortName] = useState<[boolean, boolean]>([true, true])
    const [sortPrice, setSortPrice] = useState<[boolean, boolean]>([false, false])
    
    const handleClickSortName = useCallback(() => {
        setSortCategory(([first,]) => [first, false])
        setSortPrice(([first,]) => [first, false])
        setSortName(([first, second]) => [second ? !first : first, true])
    }, [])

    const handleClickSortCategory = useCallback(() => {
        setSortPrice(([first,]) => [first, false])
        setSortName(([first,]) => [first, false])
        setSortCategory(([first, second]) => [second ? !first : first, true])
    }, [])

    const handleClickSortPrice = useCallback(() => {
        setSortCategory(([first,]) => [first, false])
        setSortName(([first,]) => [first, false])
        setSortPrice(([first, second]) => [second ? !first : first, true])
    }, [])

    useEffect(() => {
        if (sortName[1]) {
            if (sortName[0])
                setSort(sortEnum.name_asc)
            else
                setSort(sortEnum.name_desc)
        } else if (sortCategory[1]) {
            if (sortCategory[0])
                setSort(sortEnum.category_asc)
            else
                setSort(sortEnum.category_desc)
        } else if (sortPrice[1]) {
            if (sortPrice[0])
                setSort(sortEnum.price_asc)
            else
                setSort(sortEnum.price_desc)
        }
    }, [sortName, sortPrice, sortCategory])

    useEffect(() => {
        getAllProducts()
            .then(([status, response]) => {
                if (status)
                    setProducts(response)
            })
    }, [])

    const sortProducts: IProduct[] = useMemo(() => {
        switch (sort) {
            case sortEnum.category_asc:
                return products.sort((a, b) => a.category - b.category)
            case sortEnum.category_desc:
                return products.sort((a, b) => b.category - a.category)
            case sortEnum.name_asc:
                return products.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0)
            case sortEnum.name_desc:
                return products.sort((a, b) => b.name.toLowerCase() < a.name.toLowerCase() ? -1 : b.name.toLowerCase() > a.name.toLowerCase() ? 1 : 0)
            case sortEnum.price_asc:
                return products.sort((a: any, b: any) => a.price - b.price)
            case sortEnum.price_desc:
                return products.sort((a: any, b: any) => b.price - a.price)
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

    const handleDeleteProduct = useCallback((productId: number) => {
        setProducts(prevState => prevState.filter(item => item.id !== productId))
    }, [])

    const handleEditProduct = useCallback((product: IProduct) => {
        console.log(product)
        setProducts(prevState => prevState.map(item => {
            if (item.id === product.id)
                return product
            return item
        }))
    }, [])

    const handleAddProduct = useCallback((product: IProduct) => {
        setProducts(prevState => [product, ...prevState])
    }, [])

    useEffect(() => {
        setPage(1)
    }, [sort])

    return (
        <>
            <Head><title>مدبربت کالاها</title></Head>
            <div
                className='w-full bg-weef-black z-30 bg-primary p-0.5 gap-0.5 rounded-xl flex flex-col items-stretch'>
                <div
                    className='w-full h-[6.5rem] bg-weef-black flex items-center justify-center gap-10 rounded-t-xl py-6 pr-12'>
                    <div className='flex items-center justify-center gap-4 w-[20%]'>
                        <div className='text-weef-white'>نام محصول</div>
                        <RotatedButton onClick={handleClickSortName}
                                       heightOnPx={80} background='linear' key={1}>
                            <SortIcon active={sortName[1]} asc={!sortName[0]}/>
                        </RotatedButton>
                    </div>
                    <div className='flex items-center justify-center gap-4 w-[25%]'>
                        <div className='text-weef-white'>دسته‌بندی محصول</div>
                        <RotatedButton onClick={handleClickSortCategory}
                                       heightOnPx={80} background='linear' key={2}>
                            <SortIcon active={sortCategory[1]} asc={!sortCategory[0]}/>
                        </RotatedButton>
                    </div>
                    <div className='flex items-center justify-center gap-4 w-[20%]'>
                        <div className='text-weef-white'>قیمت محصول</div>
                        <RotatedButton onClick={handleClickSortPrice}
                                       heightOnPx={80} background='linear' key={3}>
                            <SortIcon active={sortPrice[1]} asc={!sortPrice[0]}/>
                        </RotatedButton>
                    </div>
                </div>
                <div
                    className='w-full h-[510px] flex flex-col bg-weef-black items-center gap-3 py-4 justify-between rounded-b-xl'>
                    <div className='flex flex-col items-center justify-start w-full px-20 py-2 gap-1 grow'>
                        {
                            pageProducts.products.map((product: any) =>
                                <ManagementProductItem product={product} key={`${product.id}/${product.category}`}
                                                       handleDeleteProduct={handleDeleteProduct}
                                                       handleEditProduct={handleEditProduct}/>
                            )
                        }
                    </div>
                    <div className='w-full flex items-center justify-between py-2 px-10'>
                        <Pagination currentPage={page} setPage={setPage} pages={pageProducts.pages}
                                    maxPage={pageProducts.maxPage} minPage={pageProducts.minPage}/>
                        <Button
                            onClick={() => setOpenModal(true)}
                            size='medium'>
                            افزودن کالا
                        </Button>
                    </div>
                </div>
            </div>
            {
                openModal &&
                <AddProductModal toggleOpen={setOpenModal} handleAddProduct={handleAddProduct}/>
            }
        </>
    );
}

ManagementProducts.getLayout = function getLayout(page: any) {
    return (
        <ManagementLayout>
            {page}
        </ManagementLayout>
    )
}

export default ManagementProducts;