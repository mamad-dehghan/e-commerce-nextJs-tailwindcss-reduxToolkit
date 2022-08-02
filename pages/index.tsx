import type {NextPage} from 'next'
import Head from 'next/head'
import DefaultLayout from "../layouts/DefaultLayout";
import Carousel from '../components/costum/Carousel';
import Section from "../components/costum/Section";
import axios from "axios";
import IProduct from "../interfaces/IProduct";
import ICategory from "../interfaces/ICategory";

type packageCategoryProducts = {
    category: ICategory, products: IProduct[]
}

type props = {
    featured: IProduct[],
    categories: packageCategoryProducts[]
}


const Home = ({featured, categories}: props) => {
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

                </main>
            </DefaultLayout>
        </>
    )
}

export async function getStaticProps() {
    let fetch: IProduct[] = await axios('http://localhost:8000/store/product/featured?format=json')
        .then((res: any) => res.data)

    let fetchCategories: ICategory[] = await axios('http://localhost:8000/store/category/featured')
        .then((res: any) => res.data)

    const data: packageCategoryProducts[] = [];

    for (const category of fetchCategories) {
        const response: IProduct[] = await axios(`http://localhost:8000/store/product/category/slug/${category.slug}`)
            .then(res => res.data);
        data.push({category, products: response});
    }

    return ({
        props: {
            featured: fetch,
            categories: data
        }
    })

}

export default Home;