import axios from "axios";

export const validateCoupon = (coupon: string) => {
    return axios({
        url: 'http://localhost:8000/store/coupon/validate',
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({code: coupon})
    }).then(res => {
        if (res.data.active)
            return [true, res.data]
        return [false, res.data]
    })
        .catch(error => [false, error])
}