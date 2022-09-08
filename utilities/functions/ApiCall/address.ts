import axios from "axios";
import {ISuccessAddress} from "../../../interfaces/address";

export const submitAddress = (token: string, values: any) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8000/store/address/',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(values)
    })
        .then(res => res.data)
        .catch(() => undefined);
}

export const getAllAddresses = (token: string) => {
    return axios({
        url: 'http://localhost:8000/store/address',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.data)
        .catch(() => []);
}

export const getSpecificAddress = (token: string, addressId: number) => {
    return getAllAddresses(token)
        .then(response => {
            return response.find((item: ISuccessAddress) => item.id === addressId)
        })
}

export const findOrCreateAddress = (token: string, values: { address: string, phone: string }) => {
    return getAllAddresses(token)
        .then(async (addresses) => {
            const index: number = await addresses.findIndex((item: ISuccessAddress) => item.address === values.address && item.phone === values.phone)
            if (index === -1) {
                return submitAddress(token, values)
                    .then((response) => {
                        return [true, response.id]
                    })
                    .catch(() => [false, 'address'])
            } else {
                return [true, addresses[index].id]
            }
        }).catch(() => [false, 'address'])
}