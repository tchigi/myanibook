import { AppDispatch } from '../store'
import axios from 'axios'
import { AnimeData, IAnime, IAnimeCategories, IAnimeGenres } from '../../models/IAnime'
import { animeSlice } from './AnimeSlice'
import { genresSlice } from './GenresSlice'
import { GenresURL } from '../../constants/url'
import { IGenre } from '../../models/IGenre'

export const fetchAnimeList =
    (currentPage: number = 0, sortType: string = 'id') =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(animeSlice.actions.animeListFetching())
            const response = await axios.get<IAnime>(`https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=${currentPage}&sort=${sortType}`)
            dispatch(animeSlice.actions.animeListFetchingSuccess(response.data))
        } catch (e: any) {
            dispatch(animeSlice.actions.animeListFetchingError(e.message))
        }
    }

export const fetchSearchAnimeList = (text: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(animeSlice.actions.animeSearchFetching(text))
        const response = await axios.get<IAnime>(`https://kitsu.io/api/edge/anime?filter[text]=${text}&page[limit]=20`)
        dispatch(animeSlice.actions.animeSearchSuccess(response.data))
    } catch (e: any) {
        dispatch(animeSlice.actions.animeSearchFetchingError(e.message))
    }
}

export const fetchPaginateSearchedAnimeList = (link: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(animeSlice.actions.animeListFetching())
        const response = await axios.get<IAnime>(link)
        dispatch(animeSlice.actions.animeSearchSuccess(response.data))
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

export const fetchGenresList = (link: string = GenresURL) => async (dispatch: AppDispatch) => {
    try {
        dispatch(genresSlice.actions.genresFetching)
        const response = await axios.get<IGenre>(link)
        dispatch(genresSlice.actions.genresFetchingSuccess(response.data))
    } catch (e: any) {
        dispatch(genresSlice.actions.animeListFetchingError(e.message))
    }
}

export const fetchSortedByGenresSearchedAnimeList = (text: string, genres: string ) => async (dispatch: AppDispatch) => {
    try {
        dispatch(animeSlice.actions.animeSearchFetching(text))
        const response = await axios.get<IAnime>(`https://kitsu.io/api/edge/anime?filter[text]=${text}&page[limit]=20&filter[genres]=${genres}`)
        dispatch(animeSlice.actions.animeSearchSuccess(response.data))
    } catch (e: any) {
        dispatch(animeSlice.actions.animeSearchFetchingError(e.message))
    }
}
