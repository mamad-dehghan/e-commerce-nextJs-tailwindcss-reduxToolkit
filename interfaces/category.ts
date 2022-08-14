export default interface ICategory {
    id: number,
    parent: null | ICategory,
    children: null | ICategory[],
    name: string,
    slug: string
    icon: string | null,
    image: string | null,
    featured: boolean,
}