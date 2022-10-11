import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {getAllOrders} from "../../utilities/functions/ApiCall/order";
import {useCookies} from "react-cookie";
import RotatedButton from "../../components/common/RotatedButton";
import Button from "../../components/common/Button";
import {ISuccessOrder} from "../../interfaces/order";
import ManagementOrderItem from "../../components/costum/Management/ManagementOrderItem";
import SortIcon from "../../utilities/icons/SortIcon";
import {getAllUsersInformation, getAUserInformation} from "../../utilities/functions/ApiCall/user";
import {ISuccessUser} from "../../interfaces/editUser";
import Pagination from "../../components/costum/Pagination";
import ManagementLayout from "../../layouts/ManagementLayout";
import Head from "next/head";


enum filterEnum {
    checked = 'checked',
    payed = 'payed'
}

enum sortEnum {
    newest,
    oldest,
    mostSpend,
    lessSpend,
    nearest,
    most_far
}

const ManagementOrders = () => {
    const [cookies] = useCookies(['token']);
    const [orders, setOrders] = useState<ISuccessOrder[]>([])
    const [filter, setFilter] = useState<filterEnum>(filterEnum.payed)
    const [sort, setSort] = useState<sortEnum>(sortEnum.newest)
    const [page, setPage] = useState<number>(1)
    const [usersInformation, setUsersInformation] = useState<ISuccessUser[]>([])

    // [false=> asc \ true=> desc  ,  false=>notSelect \ true=>select]
    const [sortOrderDate, setSortOrderDate] = useState<[boolean, boolean]>([false, false])
    const [sortSendOrderDate, setSortSendOrderDate] = useState<[boolean, boolean]>([true, true])
    const [sortPrice, setSortPrice] = useState<[boolean, boolean]>([false, false])

    useEffect(() => {
        getAllOrders(cookies.token)
            .then(res => {
                setOrders(res)
            })
        getAllUsersInformation(cookies.token)
            .then(([status, response]) => {
                if (status)
                    setUsersInformation(response)
            })
    }, [])

    const handleClickSortName = useCallback(() => {
        setSortOrderDate(([first,]) => [first, false])
        setSortPrice(([first,]) => [first, false])
        setSortSendOrderDate(([first, second]) => [second ? !first : first, true])
    }, [])

    const handleClickSortCategory = useCallback(() => {
        setSortPrice(([first,]) => [first, false])
        setSortSendOrderDate(([first,]) => [first, false])
        setSortOrderDate(([first, second]) => [second ? !first : first, true])
    }, [])

    const handleClickSortPrice = useCallback(() => {
        setSortOrderDate(([first,]) => [first, false])
        setSortSendOrderDate(([first,]) => [first, false])
        setSortPrice(([first, second]) => [second ? !first : first, true])
    }, [])

    useEffect(() => {
        if (sortSendOrderDate[1]) {
            if (sortSendOrderDate[0])
                setSort(sortEnum.oldest)
            else
                setSort(sortEnum.newest)
        } else if (sortOrderDate[1]) {
            if (sortOrderDate[0])
                setSort(sortEnum.nearest)
            else
                setSort(sortEnum.most_far)
        } else if (sortPrice[1]) {
            if (sortPrice[0])
                setSort(sortEnum.lessSpend)
            else
                setSort(sortEnum.mostSpend)
        }
    }, [sortSendOrderDate, sortPrice, sortOrderDate])

    const filterOrders: ISuccessOrder[] = useMemo(() => {
        switch (filter) {
            case filterEnum.payed:
                return orders.filter(item => item.status === filterEnum.payed)
            case filterEnum.checked:
                return orders.filter(item => item.status === filterEnum.checked)
            default:
                return orders.filter(item => item.status === filterEnum.payed)
        }
    }, [filter, orders])

    const sortOrders: ISuccessOrder[] = useMemo(() => {
        switch (sort) {
            case sortEnum.mostSpend:
                return filterOrders.sort((a, b) => a.total - b.total)
            case sortEnum.lessSpend:
                return filterOrders.sort((a, b) => b.total - a.total)
            case sortEnum.newest:
                return filterOrders.sort((a, b) => Date.parse(a.created) - Date.parse(b.created))
            case sortEnum.oldest:
                return filterOrders.sort((a, b) => Date.parse(b.created) - Date.parse(a.created))
            case sortEnum.nearest:
                return filterOrders.sort((a, b) => Date.parse(a.data.sendOrderTime) - Date.parse(b.data.sendOrderTime))
            case sortEnum.most_far:
                return filterOrders.sort((a, b) => Date.parse(b.data.sendOrderTime) - Date.parse(a.data.sendOrderTime))
            default:
                return filterOrders.sort((a, b) => b.total - a.total)
        }
    }, [filterOrders, sort])

    const pageOrders = useMemo(() => {
        const pageSize: number = 5;
        const pagesCount: number = sortOrders.length;
        const maxPage: number = Math.max(1, Math.ceil(pagesCount / pageSize));
        const minIndex: number = (page - 1) * pageSize;
        const maxIndex: number = Math.min(sortOrders.length + 1, page * pageSize);
        const pages: number[] = [];

        for (let i = page - 2; i <= page + 2; i++)
            if ((i >= 1) && (i <= maxPage))
                pages.push(i);

        return {
            totalCount: sortOrders.length,
            minPage: 1,
            maxPage,
            pages,
            orders: sortOrders.slice(minIndex, maxIndex),
        }
    }, [page, sortOrders, sort])

    const handleChange = useCallback((order: ISuccessOrder) => {
        setOrders(prevState => prevState.map((item: ISuccessOrder) => (item.id === order.id) ? order : item))
    }, [])

    useEffect(() => {
        setPage(1)
    }, [filter])

    return (
        <>
            <Head><title>مدیریت سفارش‌ها</title></Head>
            <div
                className='w-full bg-weef-black z-30 bg-primary p-0.5 gap-0.5 rounded-xl flex flex-col items-stretch'>
                <div
                    className='w-full h-[6.5rem] bg-weef-black flex items-center justify-center gap-10 rounded-t-xl py-6 px-32'>
                    <div className='flex items-center justify-end gap-4 w-[35%]'>
                        <div className='text-weef-white'>تاریخ ثبت سفارش</div>
                        <RotatedButton onClick={handleClickSortName}
                                       heightOnPx={80} background='linear' key={1}>
                            <SortIcon active={sortSendOrderDate[1]} asc={!sortSendOrderDate[0]}/>
                        </RotatedButton>
                    </div>
                    <div className='flex items-center justify-end gap-4 w-[35%]'>
                        <div className='text-weef-white'>تاریخ پرداخت</div>
                        <RotatedButton onClick={handleClickSortCategory}
                                       heightOnPx={80} background='linear' key={2}>
                            <SortIcon active={sortOrderDate[1]} asc={!sortOrderDate[0]}/>
                        </RotatedButton>
                    </div>
                    <div className='flex items-center justify-end gap-4 w-[30%]'>
                        <div className='text-weef-white'>هزینه سفارش</div>
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
                            pageOrders.orders.map(order =>
                                <ManagementOrderItem handleChange={handleChange}
                                                     user={getAUserInformation(order.user, usersInformation)}
                                                     order={order} key={`${order.created}/${order.status}`}/>
                            )
                        }
                    </div>
                    <div className='w-full flex items-center justify-between py-2 px-10'>
                        <Pagination currentPage={page} setPage={setPage} pages={pageOrders.pages}
                                    maxPage={pageOrders.maxPage} minPage={pageOrders.minPage}/>
                        {
                            filter === filterEnum.payed ?
                                <Button
                                    onClick={() => setFilter(filterEnum.checked)}
                                    size='medium'>
                                    مشاهده تایید شده‌ها
                                </Button>
                                :
                                <Button
                                    onClick={() => setFilter(filterEnum.payed)}
                                    size='medium'>
                                    مشاهده تایید نشده‌ها
                                </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
ManagementOrders.getLayout = function getLayout(page: any) {
    return (
        <ManagementLayout>
            {page}
        </ManagementLayout>
    )
}

export default ManagementOrders;