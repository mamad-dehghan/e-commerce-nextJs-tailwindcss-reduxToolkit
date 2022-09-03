import axios from "axios";

export const trySignIn = (values: any) => {
    return axios({
        url: 'http://localhost:8000/user/register/',
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(values)
    })
        .then(res => res.status === 200)
        .catch(error => false)
}