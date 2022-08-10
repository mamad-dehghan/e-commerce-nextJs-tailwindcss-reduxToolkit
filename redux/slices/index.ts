import BasketSlice from "./BasketSlice";
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import {combineReducers} from "@reduxjs/toolkit";
import AuthenticationSlice from "./AuthenticationSlice";


const combinedReducers = combineReducers({
    BasketSlice,
    AuthenticationSlice
})

const reducer = persistReducer({key: 'rootPersist', storage, whitelist: ['BasketSlice', 'AuthenticationSlice']}, combinedReducers)
export default reducer