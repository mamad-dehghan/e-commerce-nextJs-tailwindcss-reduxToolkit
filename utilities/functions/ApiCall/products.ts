import axios from "axios";
import {createNewBrand, findOrCreateBrand, getAllBrandNames} from "./brand";
import {ISuccessBrand} from "../../../interfaces/brand";
import {findCategoryIdByName} from "./category";

export const getAllProducts = () => {
    return axios('http://localhost:8000/store/product')
        .then(res => [(res.status === 200), res.data])
        .catch(error => [false, error])
}

export const editProductDetails = (token: string, information: any, id: number) => {
    console.log(information)
    return findCategoryIdByName(information.category)
        .then(([status, categoryId]) => {
            console.log(categoryId)
            console.log('categoryId')
            if (status) {
                return findOrCreateBrand(token, information.brand)
                    .then(brandId => {
                        console.log(brandId)
                        return axios({
                            method: 'put',
                            url: `http://localhost:8000/store/product/id/${id}`,
                            headers: {
                                'Authorization': `Token ${token}`,
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({...information, brand: brandId, category: categoryId})
                        }).then(res => [(res.status === 200), res.data])
                            .catch(error => [false, error])
                    })
            } else
                return new Promise<[boolean, any]>(() => [false, 'error'])
        })
}

export const editProductQuantityAndPrice = (token: string, information: any, id: number) => {
    return axios({
        method: 'put',
        url: `http://localhost:8000/store/product/id/${id}`,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(information)
    }).then(res => [(res.status === 200), res.data])
        .catch(error => [false, error])
}

export const deleteProduct = (token: string, id: number) => {
    return axios({
        method: 'delete',
        url: `http://localhost:8000/store/product/id/${id}`,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => [(res.status === 202), res.data])
        .catch(error => [false, error])
}

export const addProduct = async (token: string, information: any) => {
    let allBrands = await getAllBrandNames()
        .then(res => res)

    let findBrand = await allBrands.find((item: ISuccessBrand) => item.name === information.brand)
    if (!findBrand) {
        createNewBrand(token, information.brand)
            .then(([status, res]) => {
                if (status) {
                    return axios({
                        method: 'post',
                        url: `http://localhost:8000/store/product/`,
                        headers: {
                            'Authorization': `Token ${token}`,
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({...information, brand: res.id})
                    }).then(res => [res.status === 201, res.data])
                        .catch(error => [false, error])
                } else {
                    return new Promise<[boolean, any]>(() => [false, res])
                }
            })
    } else {
        return axios({
            method: 'post',
            url: `http://localhost:8000/store/product/`,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({...information, brand: findBrand.id})
        }).then(res => [res.status === 201, res.data])
            .catch(error => [false, error])
    }
}