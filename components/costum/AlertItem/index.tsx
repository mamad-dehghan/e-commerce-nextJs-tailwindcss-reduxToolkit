import Link from 'next/link';
import React from 'react';
import ItemRow from "../ItemRow";
import {Colors} from "../../../utilities/constants/colors";

type props = {
    text: string,
    link?: string
}

const AlertItem = ({text, link}: props) => {
    return (
        <div className='w-3/4 z-20 flex justify-center'>
            <ItemRow backgroundContent={Colors._black} backgroundContentOnHover={Colors._black}>
                <div className='z-10'>
                    {
                        link ?
                            <Link href={link}>
                                <a className='link text-center'>{text}</a>
                            </Link>
                            :
                            <p className='text-weef-white text-center'>{text}</p>
                    }
                </div>
            </ItemRow>
        </div>
    );
}

export default React.memo(AlertItem);