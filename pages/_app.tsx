import '../styles/globals.css'
import '../styles/carousel.scss'
import '../styles/cardSlider.scss'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {persist, store} from "../redux/store";
import {PersistGate} from "redux-persist/integration/react";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persist}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

export default MyApp
