import React from 'react';

type props = {
    className?: string
}

function SearchIcon({className = ''}: props) {
    return (
        <svg className={className} width="36" height="36" viewBox="0 0 40 40" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path stroke='#FAFAFA'
                  d="M34.9999 35L27.5233 27.51M31.6666 17.5C31.6666 21.2572 30.174 24.8606 27.5173 27.5173C24.8605 30.1741 21.2572 31.6666 17.4999 31.6666C13.7427 31.6666 10.1393 30.1741 7.48257 27.5173C4.82581 24.8606 3.33325 21.2572 3.33325 17.5C3.33325 13.7427 4.82581 10.1394 7.48257 7.48263C10.1393 4.82587 13.7427 3.33331 17.4999 3.33331C21.2572 3.33331 24.8605 4.82587 27.5173 7.48263C30.174 10.1394 31.6666 13.7427 31.6666 17.5V17.5Z"
                  strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}

export default SearchIcon;