import BasketSlice from "./BasketSlice";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {combineReducers} from "@reduxjs/toolkit";
import AuthenticationSlice from "./AuthenticationSlice";
import OrderSlice from "./OrderSlice";


const combinedReducers = combineReducers({
    BasketSlice,
    AuthenticationSlice,
    OrderSlice
})

const reducer = persistReducer({key: 'rootPersist', storage, whitelist: ['BasketSlice', 'AuthenticationSlice']}, combinedReducers)
export default reducer