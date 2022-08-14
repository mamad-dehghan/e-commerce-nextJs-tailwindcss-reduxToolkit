import '../styles/globals.css'
import '../styles/carousel.scss'
import '../styles/cardSlider.scss'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {persist, store} from "../redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {useRouter} from 'next/router';
import {useMemo} from "react";
import {CookiesProvider} from "react-cookie";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    const key = useMemo(() => {
        if (router.query.SubCategory)
            return router.query.SubCategory

        return router.asPath
    }, [router.asPath])

    return (
        <CookiesProvider>
            <Provider store={store}>
                <PersistGate persistor={persist}>
                    <Component key={key} {...pageProps} />
                </PersistGate>
            </Provider>
        </CookiesProvider>
    )
}

export default MyApp
