import { AppDispatch } from '../store'
import axios from 'axios'
import { AnimeData, IAnime, IAnimeCategories, IAnimeGenres } from '../../models/IAnime'
import { animeSlice } from './AnimeSlice'
import { genresSlice } from './GenresSlice'
import { GenresURL, StartURL } from '../../constants/url'
import { IGenre } from '../../models/IGenre'
import { useAppSelector } from '../../hooks/redux'

export const fetchAnimeList = (sort: string, genres: string, isSearched: boolean, searchValue: string, page: number) => async (dispatch: AppDispatch) => {
    const currentOffset = page * 20

    const currentSortTypeRequest = `&sort=${sort}`
    const currentPageRequest = `page[limit]=20&page[offset]=${currentOffset}`
    const currentSearchedRequest = isSearched ? `&filter[text]=${searchValue}` : ''

    const currentRequest = StartURL + currentPageRequest + currentSortTypeRequest + currentSearchedRequest + genres
    console.log(currentRequest)

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
