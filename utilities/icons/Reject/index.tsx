import React from 'react';

type props={
    className:string
}

const Reject=({className}:props)=> {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
              preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd"
                  d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1Zm3.707 8.707a1 1 0 0 0-1.414-1.414L12 10.586L9.707 8.293a1 1 0 1 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293Z"
                  clipRule="evenodd"/>
        </svg>
    );
}

export default Reject;