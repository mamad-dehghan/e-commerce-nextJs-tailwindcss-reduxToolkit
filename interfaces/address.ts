// url : localhost:8000/store/address/
// token required

/**
 * response status => 201
 */
export interface ISuccessAddress {
    id: number,
    name: string,
    phone: string | null,
    address: "یزد - میدان مسکن",
    coordinates: null | string
}

/**
 * response status => 401
 */
export interface IFailedAddress {
    detail: "Invalid token."
}