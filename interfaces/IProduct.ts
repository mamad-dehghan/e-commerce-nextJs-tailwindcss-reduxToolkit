type attributes = {
    brand: string,
    sizes?: string[] | number[],
    colors?: string[],
    rating: number
}

export default interface IProduct {
    id: number,
    name: string,
    slug: string,
    description: string
    price: string,
    final_price: string,
    main_image: string | any,
    images?: any,
    attributes: attributes,
    options?: any,
    extra_information?: any,
    featured: boolean,
    remaining: number,
    category: number
}