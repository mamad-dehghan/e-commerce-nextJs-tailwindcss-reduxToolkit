import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {useLayoutEffect, useState} from "react";
import {checkLogin} from "../functions/ApiCall/login";
const useManagementAccess= ()=>{
    const router = useRouter()
    const [cookies] = useCookies(['token']);
    const [access, setAccess] = useState<boolean>(false)
    useLayoutEffect(() => {
        checkLogin(cookies.token)
            .then(([status, response]) => {
                console.log(response)
                if (status && response.is_superuser)
                    setAccess(true)
                else
                    router.replace({pathname: '/Management/Login', query: {next: router.asPath}}, router.asPath)
            })
    }, [])
    return access
}
export default useManagementAccess