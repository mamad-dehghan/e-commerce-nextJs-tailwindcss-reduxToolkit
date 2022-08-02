import Basket from "./Basket";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {combineReducers} from "@reduxjs/toolkit";


const combinedReducers = combineReducers({
    Basket: Basket
})

const reducer = persistReducer({key: 'rootPersist', storage, whitelist: ['Basket']}, combinedReducers)
export default reducer