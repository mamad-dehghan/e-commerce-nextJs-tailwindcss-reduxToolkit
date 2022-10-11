import axios from "axios";
import ICategory from "../../../interfaces/category";

export const getCategoryById = (categoryId: number) => {
    return axios(`http://localhost:8000/store/category/id/${categoryId}`)
        .then(res => [(res.status === 200), res.data])
        .catch(error => [false, error])
}

export const getAllCategories = () => {
    return axios('http://localhost:8000/store/category')
        .then(res => [(res.status === 200), res.data])
        .catch(error => [false, error])
}

export const findCategoryIdByName = (name: string) => {
    return getAllCategories()
        .then(async ([status, res]) => {
            if (status) {
                const findCategory = await res.find((item: ICategory) => item.name === name)
                
                if (findCategory)
                    return [true, findCategory.id]
            }
            return [false, 0]
        })
}