import {createStore} from "@reduxjs/toolkit";
import reducer from "./slices/";
import {persistStore} from "redux-persist";

export const store = createStore(reducer)
export const persist = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch