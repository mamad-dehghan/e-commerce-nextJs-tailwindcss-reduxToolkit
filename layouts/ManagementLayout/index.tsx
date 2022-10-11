import React from 'react';
import NavigationBar from "../../components/costum/Management/NavigationBar";
import HomeIcon from "../../utilities/icons/HomeIcon";
import useManagementAccess from "../../utilities/hooks/useManagementAccess";

type props = {
    children: any
}

const ManagementLayout = ({children}: props) => {
    const access = useManagementAccess()
    console.log('ManagementLayout')
    return (
        <>
            {access && (
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
            )}
        </>
    );
}

export default ManagementLayout;