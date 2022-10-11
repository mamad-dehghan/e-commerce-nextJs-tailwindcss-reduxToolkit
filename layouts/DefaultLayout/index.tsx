import React, {ReactElement} from 'react';
import Header from "../Header";
import Footer from "../Footer";

type props = {
    children: ReactElement;
}

const Layout = ({children}: props) => {
    console.log('DefaultLayout')
    return (
        <div className='w-full min-h-screen flex flex-col bg-secondary'>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
}
const DefaultLayout = (page: ReactElement)=> (
    <Layout>
        {page}
    </Layout>
)

export default DefaultLayout