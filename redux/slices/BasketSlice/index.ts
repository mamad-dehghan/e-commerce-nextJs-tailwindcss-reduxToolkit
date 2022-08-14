import {createSlice} from "@reduxjs/toolkit";
import IProduct from "../../../interfaces/product";
import parse3digitNumber from "../../../utilities/functions/parse3DigitNumber";

type attributeType = {
    color?: string,
    size?: string
}

export type addToBasketType = {
    product: IProduct,
    color: string | undefined,
    size: string | undefined
}

export type singleProductType = {
    product: IProduct,
    attribute: attributeType
    count: number,
}

export type BasketSlice = {
    products: singleProductType[],
    countSum: number,
    finalSum: number
}
const initialState: BasketSlice = {
    products: [],
    countSum: 0,
    finalSum: 0
}

const BasketSlice = createSlice({
    name: 'basket/redux',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log('add')
            const index: number = state.products.findIndex(item => item.product.id === action.payload.product.id);
            if (index === -1) {
                state.products = [...state.products, {
                    product: action.payload.product,
                    count: 1,
                    attribute: {size: action.payload.size, color: action.payload.color}
                }]
            } else {
                const temp = state.products[index];
                temp.count += 1;
                state.products.splice(index, 1, temp);
            }
            state.finalSum += parse3digitNumber(action.payload.product.final_price);
            state.countSum += 1;
        },
        removeProduct: (state, action) => {
            console.log('remove')
            const index: number = state.products.findIndex(item => item.product.id === action.payload.id);
            if (index === -1) {
                return state;
            } else {
                const temp = state.products[index];
                if (temp.count === 1) {
                    state.products.splice(index, 1);
                } else {
                    temp.count -= 1;
                    state.products.splice(index, 1, temp);
                }
                state.finalSum -= parse3digitNumber(action.payload.final_price);
                state.countSum -= 1;
            }
        },
        removeAllSingleProduct: (state, action) => {
            const index: number = state.products.findIndex(item => item.product.id === action.payload.id);
            if (index === -1) {
                return state;
            } else {
                const temp = state.products[index];
                state.products.splice(index, 1);
                state.finalSum -= parse3digitNumber(action.payload.final_price) * temp.count;
                state.countSum -= temp.count;
            }
        },
        clearBasket: () => {
            return initialState;
        },
        changeProductColor: (state, action) => {
            const index = state.products.findIndex(item => item.product.id === action.payload.id);
            if (index === -1)
                return state;
            state.products[index].attribute.color = action.payload.color;
        },
        changeProductSize: (state, action) => {
            const index = state.products.findIndex(item => item.product.id === action.payload.id);
            if (index === -1)
                return state;
            state.products[index].attribute.size = action.payload.size;
        }
    }
})

export default BasketSlice.reducer;
export const {
    addProduct,
    removeProduct,
    removeAllSingleProduct,
    clearBasket,
    changeProductColor,
    changeProductSize
} = BasketSlice.actions;