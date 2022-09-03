import React, {ReactElement} from 'react';
import Header from "../Header";
import Footer from "../Footer";

type props = {
    children: ReactElement;
}

const DefaultLayout = ({children}: props) => {
    return (
        <div className='w-full min-h-screen flex flex-col bg-secondary'>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}

export default DefaultLayout