import React, {useLayoutEffect, useState} from 'react';
import NavigationBar from "../../components/costum/Management/NavigationBar";
import HomeIcon from "../../utilities/icons/HomeIcon";
import {checkLogin} from "../../utilities/functions/ApiCall/login";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

type props = {
    children: any
}
const ManagementLayout = ({children}: props) => {
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
    })
    return (
        access ?
            <div className='w-screen h-screen bg-secondary flex flex-col items-center justify-center'>
                <div
                    className='relative w-full max-w-screen-2xl h-full max-h-[720px] flex flex-col items-center justify-center pl-[4%] pr-36 overflow-hidden'>
                    <NavigationBar/>
                    {children}
                    <div className='absolute right-10 bottom-10'>
                        <HomeIcon/>
                    </div>
                </div>
            </div>
            :
            <></>
    );
}

export default ManagementLayout;