import {singleProductType} from "../../../redux/slices/BasketSlice";

type singleProductOrder = {
    product: number,
    quantity: number,
    data: {
        size?: string | number,
        color?: string
    }
}
const compactProductsForApi = (basketProducts: singleProductType[]) => {
    return basketProducts.map((item: singleProductType) => {
        const data: singleProductOrder = {
            product: item.product.id,
            quantity: item.count,
            data: {}
        }
        if (item.attribute.size)
            data.data.size = (item.attribute.size);
        if (item.attribute.color)
            data.data.color = (item.attribute.color);
        return data
    })
}
export default compactProductsForApi;