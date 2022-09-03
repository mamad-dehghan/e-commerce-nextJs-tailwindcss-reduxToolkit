import React, {useMemo} from 'react';
import classNames from "classnames";

type props = {
    active: boolean,
    asc:boolean
}

const SortIcon = ({active, asc}: props) => {
    const className = useMemo(()=>
        classNames(
            'transition-all duration-300',
            asc ? 'translate-y-1/3' : 'rotate-180 -translate-y-1/3'
        )
    ,[asc])
    return (
        <div className={className}>
            {
                active ?
                    <svg className='fill-weef-white group-hover:fill-weef-black' width="48" height="31" viewBox="0 0 48 31" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.8859 29.557L1.03222 6.86353C-1.31081 4.19346 0.593421 1.52217e-06 4.14937 1.52217e-06H43.8568C44.6526 -0.000680803 45.4318 0.228044 46.101 0.658786C46.7701 1.08953 47.301 1.70403 47.6299 2.4287C47.9588 3.15337 48.0719 3.95749 47.9555 4.74476C47.8392 5.53204 47.4984 6.26909 46.974 6.86767L27.1202 29.5529C26.7317 29.9975 26.2525 30.3539 25.7149 30.5981C25.1772 30.8422 24.5936 30.9686 24.0031 30.9686C23.4126 30.9686 22.8289 30.8422 22.2913 30.5981C21.7537 30.3539 21.2745 29.9975 20.8859 29.5529V29.557Z"
                            fill="inherit"/>
                    </svg>
                    :
                    <svg className='fill-weef-white group-hover:fill-weef-black' width="49" height="31" viewBox="0 0 49 31" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.14515 4.13964H43.8526L23.9989 26.829L4.14515 4.13964ZM1.028 6.86767L20.8817 29.5529C21.2703 29.9975 21.7494 30.3539 22.2871 30.5981C22.8247 30.8422 23.4084 30.9686 23.9989 30.9686C24.5894 30.9686 25.173 30.8422 25.7106 30.5981C26.2483 30.3539 26.7275 29.9975 27.116 29.5529L46.9697 6.86767C49.3128 4.18932 47.4085 1.52217e-06 43.8526 1.52217e-06H4.14515C3.34932 -0.000680803 2.57017 0.228044 1.901 0.658786C1.23182 1.08953 0.700992 1.70403 0.372073 2.4287C0.0431542 3.15337 -0.0699093 3.95749 0.0464221 4.74476C0.162754 5.53204 0.503548 6.26909 1.028 6.86767Z"
                            fill="inherit"/>
                    </svg>
            }
        </div>
    );
}

export default SortIcon;