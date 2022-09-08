import '../styles/globals.css'
import '../styles/carousel.scss'
import '../styles/cardSlider.scss'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {persist, store} from "../redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {ReactElement, ReactNode} from "react";
import {CookiesProvider} from "react-cookie";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NextPage} from "next";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <CookiesProvider>
            <Provider store={store}>
                <PersistGate persistor={persist}>
                    {getLayout(<Component {...pageProps} />)}
                    <ToastContainer theme="dark"
                                    position="bottom-right"
                                    hideProgressBar
                                    newestOnTop
                                    closeOnClick
                                    rtl
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover/>
                </PersistGate>
            </Provider>
        </CookiesProvider>
    )
}

export default MyApp
