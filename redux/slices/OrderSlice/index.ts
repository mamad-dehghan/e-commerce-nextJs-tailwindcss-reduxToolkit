import {createSlice} from "@reduxjs/toolkit";
import {singleProductType} from "../BasketSlice";

type singleProductOrder = {
    product: number,
    quantity: number,
    data: {
        size?: string | number,
        color?: string
    }
}

interface ICurrentOrder {
    products: singleProductOrder[],
    address: number | null,
    coupon: string | null,
    data: {
        sendOrderTime: null | string
    }
}

interface IOrderSlice {
    pendingOrder:null | fulfilledSavedOrder,
    currentOrder:ICurrentOrder
}

const initialState: IOrderSlice = {
    pendingOrder :null,
    currentOrder:{
        products: [],
        coupon: null,
        address: null,
        data: {
            sendOrderTime: null
        }
    }
}

interface fulfilledSavedOrder {
    id: number,
    products: {
        id: number,
        quantity: number,
        created: string,
        product: number,
        data: {
            size?: string | number,
            color?: string
        }
    }[],
    total:number,
    created: string,
    status: "pending",
    data: {
        sendOrderTime: string
    },
    user: number,
    coupon: null | string,
    address: number
}

const OrderSlice = createSlice({
    name: 'order/redux',
    initialState,
    reducers: {
        saveCoupon: (state, action) => {
            state.currentOrder.coupon = action.payload;
        },
        saveAddress: (state, action) => {
            state.currentOrder.address = action.payload;
        },
        saveProducts: (state, action) => {
            state.currentOrder.products = action.payload.map((item: singleProductType) => {
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
            // console.log(state.currentOrder)
        },
        saveOrderSendTime: (state, action) => {
            state.currentOrder.data.sendOrderTime = action.payload.toISOString();
        },
        saveOrder:(state, action)=>{
            state.pendingOrder = action.payload;
        }
    }
})

export default OrderSlice.reducer;
export const {saveCoupon, saveOrder, saveOrderSendTime, saveProducts, saveAddress} = OrderSlice.actions;