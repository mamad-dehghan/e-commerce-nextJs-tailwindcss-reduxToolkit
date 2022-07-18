import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>WEEF Online Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header />
        Home page.
        <Footer />
    </>
  )
}

export default Home
