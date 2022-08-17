import axios from "axios";

export const trySignIn = (values: any) => {
    return axios.post('http://localhost:8000/user/register/', JSON.stringify(values))
        .then(res => res.status === 200)
        .catch(error => error)
}