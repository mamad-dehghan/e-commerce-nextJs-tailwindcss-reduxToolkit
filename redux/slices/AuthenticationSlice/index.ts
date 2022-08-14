import {createSlice} from "@reduxjs/toolkit";
import {ISuccessLogin} from "../../../interfaces/login";
import {ISuccessSignIn} from "../../../interfaces/signIn";

export type AuthSliceType = {
    "logStatus": 'notLog' | 'log',
    "username": string | undefined,
    "first_name": string,
    "last_name": string,
    "email": string,
    "address": string | null,
    "address_id" : number | null,
    "postal_number" : string | null,
    "phone": string | null,
    "token": undefined | string,
    "remember": boolean
}
const initialState: AuthSliceType = {
    "logStatus": 'notLog',
    "username": undefined,
    "first_name": '',
    "last_name": '',
    "email": '',
    "address": null,
    "address_id" : null,
    "postal_number" : null,
    "phone": null,
    "token": undefined,
    "remember": false
}
export type tryLoginType = {
    username: string,
    password: string
}

function instanceOfFulfilledLogin(data: any): data is ISuccessLogin {
    return 'token' in data;
}

function instanceOfFulfilledSignIn(data: any): data is ISuccessSignIn {
    return 'id' in data;
}

// export const tryLogin = createAsyncThunk('check', async (data,a) => {
//     console.log(data)
//     console.log(a)
//     console.log('data')
//     const response: fulfilledLogin | rejectedLogin = await axios.post('localhost:8000/user/login',
//         data)
//         .then(res => res.data)
//     console.log(response)
//     return response
//     // const p : rejectedLogin = {status:"failed"};
//     // return p;
// })

const AuthenticationSlice = createSlice({
    name: 'redux/auth',
    initialState,
    reducers: {
        alterLogin: (state, action) => {
            if (instanceOfFulfilledLogin(action.payload.data)) {
                return {
                    "logStatus": 'log',
                    "username": action.payload.data.userInfo.username,
                    "first_name": action.payload.data.userInfo.first_name,
                    "last_name": action.payload.data.userInfo.last_name,
                    "email": action.payload.data.userInfo.email,
                    "address": action.payload.data.userInfo.address,
                    "address_id": state.address_id,
                    "postal_number": state.postal_number,
                    "phone": action.payload.data.userInfo.phone,
                    "token": action.payload.data.token,
                    "remember": action.payload.save
                }
            } else {
                return state;
            }
        },
        alterSignIn: (state, action) => {
            if (instanceOfFulfilledSignIn(action.payload.data)) {
                state.username = action.payload.data.userInfo.username;
                state.email = action.payload.data.userInfo.email;
                state.remember = action.payload.save
            } else {
                return state;
            }
        },
        alterAddAddress:(state, action)=>{
            state.address_id = action.payload.id;
            state.address = action.payload.address;
            state.postal_number = action.payload.postalNumber;
        },
        alterCompleteInformation:(state, action)=>{
            state.phone = action.payload.data.phone
        }
    },
    // extraReducers: (builder: ActionReducerMapBuilder<AuthSliceType>) => {
    //     builder.addCase(tryLogin.fulfilled, (state, action: PayloadAction<fulfilledLogin | rejectedLogin>) => {
    //         console.log('extraReducer')
    //         // if (instanceOfFulfilledLogin(action.payload)) {
    //         //     return {
    //         //         "logStatus": 'log',
    //         //         "username": action.payload.userInfo.username,
    //         //         "first_name": action.payload.userInfo.first_name,
    //         //         "last_name": action.payload.userInfo.last_name,
    //         //         "email": action.payload.userInfo.email,
    //         //         "address": action.payload.userInfo.address,
    //         //         "phone": action.payload.userInfo.phone,
    //         //         "token": action.payload.token
    //         //     }
    //         // } else {
    //         //     return state;
    //         // }
    //     })
    // },
})

export default AuthenticationSlice.reducer;
export const {alterLogin, alterSignIn, alterAddAddress} = AuthenticationSlice.actions;