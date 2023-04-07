import { GenresAttributes } from './IAnime'

export interface GenreData {
    id: string,
    type: string,
    links: {
        self: string
    },
    attributes: {
        createdAt: string
        updatedAt: string
        name: string
        slug: string
        description: any
    }
}

export interface IGenre {
    data: GenreData[]
    meta: any
    links: any
}
