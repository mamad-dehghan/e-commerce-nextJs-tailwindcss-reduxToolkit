import {createSlice} from "@reduxjs/toolkit";
import IProduct from "../../../interfaces/IProduct";

type BasketSlice = {
    products: {
        product: IProduct,
        count: number
    }[],
    finalSum: number
}
const initialState: BasketSlice = {
    products: [],
    finalSum: 0
}

const Basket = createSlice({
    name: 'basket/redux',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log('add')
            const index: number = state.products.findIndex(item => item.product.id === action.payload.id);
            if (index === -1) {
                state.products = [...state.products, {product: action.payload, count: 1}]
            } else {
                const temp = state.products[index];
                temp.count += 1;
                state.products.splice(index, 1, temp);
            }
            state.finalSum += action.payload.final_price
        },
        removeProduct: (state, action) => {
            console.log('remove')
            const index: number = state.products.findIndex(item => item.product.id === action.payload.id);
            if (index === -1) {
                return state;
            } else {
                const temp = state.products[index];
                temp.count -= 1;
                state.products.splice(index, 1, temp);
                state.finalSum -= action.payload.final_price;
            }
        },
        removeAllSingleProduct: (state, action) => {
            const index: number = state.products.findIndex(item => item.product.id === action.payload.id);
            if (index === -1) {
                return state;
            } else {
                const temp = state.products[index];
                state.products.splice(index, 1);
                state.finalSum -= (action.payload.final_price * temp.count);
            }
        },
        clearBasket: (state) => {
            return initialState;
        }
    }
})

export default Basket.reducer;
export const {addProduct, removeProduct, removeAllSingleProduct, clearBasket} = Basket.actions;