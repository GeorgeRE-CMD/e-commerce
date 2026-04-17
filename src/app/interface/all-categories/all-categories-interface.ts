export interface IAllCategoriesInterface {
    results: number
    metadata: Metadata
    data: ICategories[]
}

export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
}

export interface ICategories {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
}


