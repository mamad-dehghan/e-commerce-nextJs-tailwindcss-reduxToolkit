import React from 'react';

type props={
    className:string
}

const Accept = ({className}:props) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd"
                  d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159l-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6Z"
                  clipRule="evenodd"/>
        </svg>
    );
}

export default Accept;