import axios from "axios";

export enum orderSituationEnum {
    payed = 'payed',
    canceled = 'canceled',
    checked = 'checked'
}

export const submitPendingOrder = (token: string, currentOrder: any) => {
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
            data: order.data,
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