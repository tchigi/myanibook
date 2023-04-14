export interface CategoriesData {
    id: string,
    type: string,
    links: {
        self: string
    },
    attributes: {
        createdAt: string
        updatedAt: string
        title: string
        slug: string
        description: any
    }
}

export interface ICategories {
    data: CategoriesData[]
    meta: any
    links: any
}
