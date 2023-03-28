export interface IAnime {
    data: AnimeData[]
    meta: any
    links: AnimeLinks
}

export interface IAnimeGenres {
    data: {
        id: string
        attributes: GenresAttributes
    }[]
    meta: any
    links: any
}

export interface IAnimeCategories {
    data: {
        id: string
        attributes: CategoriesAttributes
    }[]
    meta: any
    links: any
}

export interface AnimeData {
    id: string
    attributes: AnimeAttributes
    relationships: AnimeRelationships
    links: any
}

export interface AnimeLinks {
    first:string
    prev:string
    next:string
    last:string
}

export interface AnimeRelationships {
    genres: {
        links: {
            related: string
        }
    }
    categories: {
        links: {
            related: string
        }
    }
}

export interface GenresAttributes {
    name: string
}

export interface CategoriesAttributes {
    title: string
}

export interface AnimeAttributes {
    description: string
    canonicalTitle: string
    posterImage: PosterImage
    startDate: string
    showType: string
    averageRating: string
}

export interface PosterImage {
    tiny: string
    large: string
    small: string
    medium: string
    original: string
}
