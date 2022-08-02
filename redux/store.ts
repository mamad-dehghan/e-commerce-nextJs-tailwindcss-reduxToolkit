import {configureStore} from "@reduxjs/toolkit";
import Basket from "./slices/Basket";

export const store = configureStore({
    reducer: {
        Basket
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch