// url :localhost:8000/user/register/

/**
 * response status => 201
 */
export interface ISuccessSignIn {
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
 * response status => 406
 */
export interface IFailedSignIn {
    status: "failed",
    message: string,
    parameters: any
}