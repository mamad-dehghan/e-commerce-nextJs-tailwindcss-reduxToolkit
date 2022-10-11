import axios from "axios";
import {ISuccessBrand} from "../../../interfaces/brand";

export const getAllBrandNames = () => {
    return axios('http://localhost:8000/store/brand/')
        .then(res => res.data)
        .catch(error => error)
}

export const createNewBrand = (token: string, brandName: string) => {
    return axios({
        url: 'http://localhost:8000/store/brand/',
        method: 'post',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({name: brandName})
    }).then(res => [(res.status === 201), res.data])
        .catch(error => [false, error])
}

export const findBrandNameById = async (brandId: number) => {
    let allBrands = await getAllBrandNames()
        .then(res => res)

    let findBrand = await allBrands.find((item: ISuccessBrand) => item.id === brandId)

    return [!!findBrand, findBrand?.name]
}

export const findOrCreateBrand = async (token: string, brandName: string) => {
    let allBrands = await getAllBrandNames()
        .then(res => res)

    let findBrand = await allBrands.find((item: ISuccessBrand) => item.name === brandName)
    
    if (!findBrand) {
        return createNewBrand(token, brandName)
            .then(([status, res]) => {
                console.log(status, res)
                if (status)
                    return res.id
                else
                    return 0
            })
    } else {
        return findBrand.id
    }
}