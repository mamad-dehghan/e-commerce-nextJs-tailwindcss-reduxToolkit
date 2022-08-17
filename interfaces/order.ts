// url : localhost:8000/store/order
// token required

export type singleProductOrder = {
    id: number,
    data: {
        size?: string,
        color?: string
    },
    quantity: number,
    created: string,
    product: number
}

/**
 * response status => 200
 */
export interface ISuccessOrder {
    id: number,
    "products": singleProductOrder[],
    total: number,
    created: string,
    status: string,
    data: any,
    user: number,
    coupon: string | null,
    address: number
}

/**
 * response status => 401
 */
export interface IFailedOrder {
    detail: "Not found."
}