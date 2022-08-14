// url : localhost:8000/user/login/

/**
 * response status => 200
 */
export interface ISuccessLogin {
    userInfo: {
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
    },
    token: string
}

/**
 * response status => 401
 */
export interface IFailedLogin {
    status : "failed"
}