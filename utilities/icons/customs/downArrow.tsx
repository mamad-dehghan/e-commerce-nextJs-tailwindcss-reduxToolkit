import React from 'react';

type props = {
    color:string,
    className:any
}

function DownArrow({color,...className}:props) {
    return (
        <svg {...className} width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 9L17 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}

export default DownArrow;