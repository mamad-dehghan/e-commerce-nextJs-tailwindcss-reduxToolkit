import axios from "axios";
import {singleProductOrder} from "../../../interfaces/order";

export enum orderSituationEnum {
    payed = 'payed',
    canceled = 'canceled'
}

export const submitPendingOrder = (token: string, currentOrder: any) => {
    console.log(currentOrder)
    return axios({
        method: 'post',
        url: 'http://localhost:8000/store/order',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({...currentOrder, status: "pending"})
    })
        .then(res => [(res.status === 200), res.data])
        .catch(error => [false, error])
}

export const submitOrder = (token: string, order: any, situation: orderSituationEnum) => {
    return axios({
        method: 'put',
        url: `http://localhost:8000/store/order/${order.id}`,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            address: order.address,
            coupon: order.coupon,
            data: order.data,
            products: order.products.map((item: singleProductOrder) => {
                return {
                    id: item.id,
                    quantity: item.quantity,
                    product: item.product,
                    data: item.data
                }
            }),
            status: situation
        })
    })
        .then(res => [(res.status === 200), res.data])
        .catch(error => [false, error]);
}

export const getAllOrders = (token: string) => {
    return axios({
        url: 'http://localhost:8000/store/order',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.data)
        .catch(() => [])
}