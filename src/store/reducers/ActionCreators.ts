import { AppDispatch } from '../store'
import axios from 'axios'
import { IAnime, IAnimeCategories, IAnimeGenres, AnimeData } from '../../models/IAnime'
import { animeSlice } from './AnimeSlice'
import { viewedSlice } from './ViewedSlice'
import { genresSlice } from './GenresSlice'
import { CategoriesURL, GenresURL, StartURL } from '../../constants/url'
import { IGenre } from '../../models/IGenre'
import { categoriesSlice } from './CategoriesSlice'
import { ICategories } from '../../models/ICategories'

export const fetchAnimeList = (sort: string, genres: string, categories: any, isSearched: boolean, searchValue: string, page: number) => async (dispatch: AppDispatch) => {
    const currentOffset = Object.values(categories).join('') ? (page + 1) * 20 : page * 20
    const currentSortTypeRequest = `&sort=${Array.isArray(sort) ? '-averageRating' : sort}`
    const currentPageRequest = `page[limit]=20&page[offset]=${currentOffset}`
    const currentSearchedRequest = isSearched ? `&filter[text]=${searchValue}` : ''
    const currentCategories = `${categories.categories !== '' ? categories.categories : ''}&${categories.subtype !== '' ? categories.subtype : ''}&${categories.ageRating !== '' ? categories.ageRating : ''}`

    const currentRequest = StartURL + currentPageRequest + currentSortTypeRequest + currentSearchedRequest + genres + currentCategories

    try {
        dispatch(animeSlice.actions.animeListFetching())
        const response = await axios.get<IAnime>(currentRequest)
        dispatch(animeSlice.actions.animeListFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(animeSlice.actions.animeListFetchingError(e.message))
    }
}

export const fetchAnimeGenres = (link: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(animeSlice.actions.animeListFetching())
        const response = await axios.get<IAnimeGenres>(link)
        dispatch(animeSlice.actions.modalAnimeSelectedFetchingGenres(response.data))
    } catch (e: any) {
        dispatch(animeSlice.actions.animeListFetchingError(e.message))
    }
}

export const fetchAnimeCategories = (link: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(animeSlice.actions.animeListFetching())
        const response = await axios.get<IAnimeCategories>(link)
        dispatch(animeSlice.actions.modalAnimeSelectedFetchingCategories(response.data))
    } catch (e: any) {
        dispatch(animeSlice.actions.animeListFetchingError(e.message))
    }
}

export const fetchGenresList =
    (link: string = GenresURL) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(genresSlice.actions.genresFetching)
            const response = await axios.get<IGenre>(link)
            dispatch(genresSlice.actions.genresFetchingSuccess(response.data))
        } catch (e: any) {
            dispatch(genresSlice.actions.animeListFetchingError(e.message))
        }
    }

export const fetchCategoriesList =
    (link: string = CategoriesURL) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(categoriesSlice.actions.categoriesFetching)
            const response = await axios.get<ICategories>(link)
            dispatch(categoriesSlice.actions.categoriesFetchingSuccess(response.data))
        } catch (e: any) {
            dispatch(categoriesSlice.actions.animeListFetchingError(e.message))
        }
    }

export const fetchAnimeByIds = (ids: string[]) => async (dispatch: AppDispatch) => {
    try {
        const chunks: string[][] = []
        for (let i = 0; i < ids.length; i += 20) {
            chunks.push(ids.slice(i, i + 20))
        }
        const responses = await Promise.all(
            chunks.map((chunk) => axios.get(`https://kitsu.io/api/edge/anime?filter[id]=${chunk.join(',')}&page[limit]=20`))
        )
        const animeData: AnimeData[] = responses.flatMap((res) => res.data.data)
        dispatch(viewedSlice.actions.setAnimeDetails(animeData))
    } catch (e: any) {
        console.log(e)
    }
}

