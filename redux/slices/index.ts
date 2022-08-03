import BasketSlice from "./BasketSlice";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {combineReducers} from "@reduxjs/toolkit";


const combinedReducers = combineReducers({
    BasketSlice: BasketSlice
})

const reducer = persistReducer({key: 'rootPersist', storage, whitelist: ['BasketSlice']}, combinedReducers)
export default reducer