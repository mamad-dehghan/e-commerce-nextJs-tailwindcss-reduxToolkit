import '../styles/globals.css'
import '../styles/carousel.scss'
import '../styles/cardSlider.scss'
import type {AppProps} from 'next/app'

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
