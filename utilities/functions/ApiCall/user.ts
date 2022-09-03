import axios from "axios";
import {ISuccessUser} from "../../../interfaces/editUser";

export const getAllUsersInformation = (token: string) => {
    return axios({
        url: 'http://localhost:8000/user/get_all_users',
        method: "get",
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
    }).then(res => [(res.status === 200), res.data])
}

export const getAUserInformation = (userId: number, allUsers: ISuccessUser[]): ISuccessUser | undefined => {
    return allUsers.find(item => item.id === userId)
}