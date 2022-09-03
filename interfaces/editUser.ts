// url : http://localhost:8000/user/change_user_info/
// token required

/**
 * response status => 200
 */
export interface ISuccessUser {
    id: number,
    last_login: null,
    is_superuser: boolean,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
    is_active: true,
    date_joined: string,
    address: null,
    phone: string,
    groups: [],
    user_permissions: []
}

/**
 * response status => 401
 */
export interface IFailedEditUser {
    detail : "Invalid token."
}