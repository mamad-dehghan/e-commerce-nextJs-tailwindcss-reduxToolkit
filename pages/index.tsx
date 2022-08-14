import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import Carousel from '../components/costum/Carousel';
import Section from "../components/costum/Section";
import axios from "axios";
import IProduct from "../interfaces/product";
import ICategory from "../interfaces/category";
import _3DigitSeparator from "../utilities/functions/_3DigitSeparator";

type packageCategoryProducts = {
    category: ICategory, products: IProduct[]
}

type props = {
    featured: IProduct[],
    incredible:IProduct[],
    categories: packageCategoryProducts[]
}


const Home = ({featured, incredible, categories}: props) => {
    return (
        <>
            <Head>
                <title>WEEF Online Shop</title>
            </Head>
            <DefaultLayout>
                <main className='bg-secondary'>
                    <Carousel/>

                    {
                        categories.map(category => (
                            <Section
                                key={category.category.id}
                                wrapper={{
                                    products: category.products,
                                    category: category.category
                                }}
                            />
                        ))
                    }

                    <Section
                        slider={{
                            title: 'محصولات پرفروش',
                            products: featured
                        }}
                    />

                    <Section
                        slider={{
                            title: 'فروش ویژه',
                            products: incredible
                        }}
                    />

                </main>
            </DefaultLayout>
        </>
    )
}

export async function getStaticProps() {
    let fetch: IProduct[] = await axios('http://localhost:8000/store/product/featured?format=json')
        .then((res: any) => res.data)

    fetch = fetch.sort(()=> Math.random() - 0.5).slice(0, 15);

    fetch = fetch.map(item => {
        return {
            ...item,
            final_price: _3DigitSeparator(item.final_price),
            price: _3DigitSeparator(item.price)
        }
    })

let incredible: IProduct[] = await axios('http://localhost:8000/store/product/incredible')
        .then((res: any) => res.data)

    incredible = incredible.sort(()=> Math.random() - 0.5).slice(0, 15);

    incredible = incredible.map(item => {
        return {
            ...item,
            final_price: _3DigitSeparator(item.final_price),
            price: _3DigitSeparator(item.price)
        }
    })

    let fetchCategories: ICategory[] = await axios('http://localhost:8000/store/category/featured')
        .then((res: any) => res.data)

    const data: packageCategoryProducts[] = [];

    for (const category of fetchCategories) {
        let response: IProduct[] = await axios(`http://localhost:8000/store/product/category/slug/${category.slug}`)
            .then(res => res.data);
        response = response.map(item => {
            return {
                ...item,
                final_price: _3DigitSeparator(item.final_price),
                price: _3DigitSeparator(item.price)
            }
        })
        data.push({category, products: response});
    }

    return ({
        props: {
            featured: fetch,
            incredible,
            categories: data
        }
    })

}

export default Home;