import BasketSlice from "./BasketSlice";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {combineReducers} from "@reduxjs/toolkit";
import OrderSlice from "./OrderSlice";


const combinedReducers = combineReducers({
    BasketSlice,
    OrderSlice
})

const reducer = persistReducer({key: 'rootPersist', storage, whitelist: ['BasketSlice']}, combinedReducers)
export default reducer