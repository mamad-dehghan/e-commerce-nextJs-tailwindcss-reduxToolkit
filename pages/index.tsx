import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Accept from "../utilities/icons/Accept";
import Reject from "../utilities/icons/Reject";

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
        <Accept className='w-10 h-10 text-amber-500'/>
        <Reject className='w-10 h-10 text-amber-500'/>
    </>
  )
}

export default Home
