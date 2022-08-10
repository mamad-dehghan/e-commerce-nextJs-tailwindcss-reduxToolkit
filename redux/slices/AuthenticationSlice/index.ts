import {createSlice} from "@reduxjs/toolkit";

export type AuthSliceType = {
    "logStatus": 'notLog' | 'log',
    "username": string | undefined,
    "first_name": string,
    "last_name": string,
    "email": string,
    "address": string | null,
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
    "phone": null,
    "token": undefined,
    "remember":false
}
export type tryLoginType = {
    username: string,
    password: string
}

export interface rejectedLogin {
    "status": "failed"
}

export interface fulfilledLogin {
    "userInfo": {
        "id": number,
        "last_login": any,
        "is_superuser": false,
        "username": string,
        "first_name": string,
        "last_name": string,
        "email": string,
        "is_staff": false,
        "is_active": boolean,
        "date_joined": string,
        "address": string | null,
        "phone": string | null,
        "groups": [],
        "user_permissions": []
    },
    "token": string
}

function instanceOfFulfilledLogin(data: any): data is fulfilledLogin {
    return 'token' in data;
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
        alterLogin: (state, action)=>{
            console.log('data', action.payload);
            if (instanceOfFulfilledLogin(action.payload.data)) {
                return {
                    "logStatus": 'log',
                    "username": action.payload.data.userInfo.username,
                    "first_name": action.payload.data.userInfo.first_name,
                    "last_name": action.payload.data.userInfo.last_name,
                    "email": action.payload.data.userInfo.email,
                    "address": action.payload.data.userInfo.address,
                    "phone": action.payload.data.userInfo.phone,
                    "token": action.payload.data.token,
                    "remember" : action.payload.remember
                }
            } else {
                return state;
            }
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
export const {alterLogin} = AuthenticationSlice.actions;