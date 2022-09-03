// url :localhost:8000/user/register/

/**
 * response status => 200
 */
export interface ISuccessCoupon {
    id: number,
    code: string,
    discount: string,
    discount_type: "percent" | "absolute",
    active: boolean
}

/**
 * response status => 404
 */
export interface IFailedCoupon {
    detail: string
}