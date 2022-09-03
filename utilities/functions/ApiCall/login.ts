import axios from "axios";

export const tryToLogin = (values: any) => {
    return axios.post(
        'http://localhost:8000/user/login/',
        values
    )
        .then(res => [res.status, res.data])
        .catch(error => [500, error])
}

export const checkLogin = (token: string | null | undefined) => {
    return axios({
        method: "put",
        url: 'http://localhost:8000/user/change_user_info/',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => [(res.status === 200), res.data])
        .catch(error => [false, error])
}

export const submitUserInformation = (token: string, values: any) => {
    return axios({
        method: "put",
        url: 'http://localhost:8000/user/change_user_info/',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(values)
    })
        .then(response => [(response.status === 200), response.data])
        .catch(error => [false, error])
}

