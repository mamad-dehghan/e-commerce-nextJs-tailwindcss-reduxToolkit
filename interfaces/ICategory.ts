export default interface ICategory {
    children: null | ICategory[],
    featured: boolean,
    icon: null,
    id: number,
    image: null,
    name: string,
    parent: null | ICategory,
    slug: string
}