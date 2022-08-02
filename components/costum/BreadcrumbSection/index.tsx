import React from 'react';
import BreadCrumb from "../../common/Breadcrumb";

type option = {
    link: string,
    name: string,
    disable?: boolean
}

type props = {
    options: option[]
}

function BreadcrumbSection({options}: props) {
    return (
        <>
            {
                options !== [] ?
                    <div className='Container'>
                        <div
                            className='h-20 pr-8 flex flex-row items-center justify-start gap-0.5 flex-nowrap overflow-x-auto scroll'>
                            {
                                options.map((item, index) => (
                                    <BreadCrumb key={index} link={item.link} name={item.name} disable={item.disable}/>
                                ))
                            }
                        </div>
                    </div> :
                    <></>
            }
        </>
    );
}

export default BreadcrumbSection;