import React, {useCallback, useMemo} from 'react';
import {useRouter} from "next/router";
import classNames from "classnames";

type props = {
    link: string,
    name: string,
    disable?: boolean
}

const BreadCrumb = ({link, name, disable = false}: props) => {
    const router = useRouter()
    const handleClick = useCallback(() => {
        !disable && router.push(link);
    }, [disable, link, router])

    const classNameTop = useMemo(() => {
        return classNames(
            'h-5 -skew-x-[45deg] w-40 border-x border-t border-primary-red',
            disable ? 'bg-weef-secondary' : 'bg-weef-black group-hover:bg-primary cursor-pointer'
        )
    }, [disable])

    const classNameBottom = useMemo(() => {
        return classNames(
            'h-5 skew-x-[45deg] w-40 border-x border-b border-primary-red',
            disable ? 'bg-weef-secondary' : 'bg-weef-black group-hover:bg-primary cursor-pointer'
        )
    }, [disable])

    const classNameLink = useMemo(() => {
        return classNames(
            'absolute w-36 text-center h-full top-0 right-2.5 py-1 px-4 flex items-center pointer-events-none whitespace-nowrap overflow-ellipsis overflow-x-hidden',
            disable ? 'text-weef-grey' : 'text-transparent bg-clip-text bg-primary group-hover:text-weef-black group-hover:bg-clip-content group-hover:bg-transparent '
        )
    }, [disable])

    return (
        <div
            onClick={handleClick}
            className='group relative h-10'>
            <div
                className={classNameTop}/>
            <div
                className={classNameBottom}/>
            <div
                className={classNameLink}>{name}</div>
        </div>
    );
}

export default BreadCrumb;