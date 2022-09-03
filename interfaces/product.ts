type attributes = {
    sizes?: string[] ,
    colors?: string[],
    rating: number
}

export default interface IProduct {
    id: number,
    sell: number,
    related_products: any[],
    rate: number,
    comments: any[],
    name: string,
    slug: string,
    description: string
    price: string,
    final_price: string,
    main_image: string ,
    images: string[] ,
    attributes: attributes,
    options: any,
    extra_information: any,
    featured: boolean,
    remaining: number,
    created_at: string,
    category: number,
    brand: string
}