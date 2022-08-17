import axios from "axios";

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