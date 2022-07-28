import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Accept from "../utilities/icons/Accept";
import Reject from "../utilities/icons/Reject";
import DefaultLayout from "../layouts/DefaultLayout";
import ProductCard from "../components/common/ProductCard";
import {useState} from "react";
import image from './../public/e2.jpg'
import CardSlider from "../components/costum/CardSlider";
import SwiperButton from "../utilities/icons/SwiperButton";
import Carousel from '../components/costum/Carousel';
import Section from "../components/costum/Section";
import CardsWrapper from "../components/costum/CardsWrapper";

//
// const convertBase64 = (file:any) => {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);
//
//         fileReader.onload = () => {
//             resolve(fileReader.result);
//         };
//
//         fileReader.onerror = (error) => {
//             reject(error);
//         };
//     });
// };

// <ProductCard title={'کیف دستی'} price={'245.000'} image={image} colors={['#345487', '#A53f32', '#950bb1']} sizes={[40, 41, 42]} />
const product = {
    id:'adafe',
    title: 'کیف دستی',
    price: '245.000',
    image: image,
    colors: ['#345487', '#A53f32', '#950bb1'],
    sizes: [40, 41, 42]
}
const products = [{...product},{...product},{...product},{...product},{...product},{...product},{...product},{...product},{...product},{...product},{...product},{...product}]


const Home: NextPage = () => {
    // const [file, setFile] = useState<any | null>(null)
    //
    // console.log(file)
    //
    // const change = async ()=>{
    //     const base64 = await convertBase64(file);
    //     console.log(base64)
    // }


    return (
        <>
            <Head>
                <title>WEEF Online Shop</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <DefaultLayout>
                    <main className='bg-secondary'>
                        <Carousel />

                        <Section background='primary' title='کیف‌های مجلسی' >
                            <CardsWrapper products={[{...product},{...product},{...product},{...product},{...product},{...product},{...product},{...product}]} />
                        </Section>

                        <Section background='primary' title='کفش‌های ورزشی' >
                            <CardsWrapper products={[{...product},{...product},{...product},{...product},{...product},{...product},{...product},{...product}]} />
                        </Section>

                        <Section background='black' title='محصولات پرفروش' >
                            <CardSlider products={products}/>
                        </Section>
                    </main>
            </DefaultLayout>
        </>
    )
}

export default Home
