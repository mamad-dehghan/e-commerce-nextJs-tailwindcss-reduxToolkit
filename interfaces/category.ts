export default interface Category {
    id: number,
    parent: null | Category,
    children: null | Category[],
    name: string,
    slug: string
    icon: string | null,
    image: string | null,
    featured: boolean,
}