import { AnimeAttributes, AnimeData, AnimeRelationships, IAnime, IAnimeCategories, IAnimeGenres, PosterImage } from '../../models/IAnime'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AnimeState {
    animeList: IAnime
    isLoading: boolean
    error: string
    isSearched: boolean
    sortType: string
    isModalActive: boolean
    selectedAnime: AnimeData
    genres: IAnimeGenres
    categories: IAnimeCategories
    searchValue: string
}

const initialState: AnimeState = {
    animeList: {
        data: [],
        meta: [],
        links: {
            first: '',
            prev: '',
            next: '',
            last: '',
        },
    },
    isLoading: false,
    error: '',
    isSearched: false,
    sortType: 'id',
    isModalActive: false,
    selectedAnime: {
        id: '',
        attributes: {
            description: '',
            canonicalTitle: '',
            posterImage: {
                tiny: '',
                large: '',
                small: '',
                medium: '',
                original: '',
            },
            startDate: '',
            showType: '',
            averageRating: '',
        },
        relationships: {
            genres: {
                links: {
                    related: ''
                }
            },
            categories: {
                links: {
                    related: ''
                }
            }
        },
        links: [],
    },
    genres: {
        data: [],
        meta: [],
        links: [],
    },
    categories: {
        data: [],
        meta: [],
        links: [],
    },
    searchValue: ''
}

export const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        animeListFetching(state) {
            state.isLoading = true
        },
        animeListFetchingSuccess(state, action: PayloadAction<IAnime>) {
            state.isLoading = false
            state.error = ''
            state.animeList = action.payload
        },
        animeListFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        animeSearchFetching(state, action: PayloadAction<string>) {
            state.isSearched = true
            state.isLoading = true
            state.searchValue = action.payload
        },
        animeSearchSuccess(state, action: PayloadAction<IAnime>) {
            state.isLoading = false
            state.error = ''
            state.animeList = action.payload
        },
        animeSearchFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.isSearched = false
            state.error = action.payload
        },
        animeClearSearch(state) {
            state.isSearched = false
            state.searchValue = ''
        },
        sortAnimeHandler(state, action: PayloadAction<string>) {
            state.sortType = action.payload
        },
        modalHandler(state, action: PayloadAction<boolean>) {
            state.isModalActive = action.payload
        },
        modalAnimeSelectedFetchingGenres(state, action: PayloadAction<IAnimeGenres>) {
            state.isLoading = false
            state.error = ''
            state.genres = action.payload
        },
        modalAnimeSelectedFetchingCategories(state, action: PayloadAction<IAnimeCategories>) {
            state.isLoading = false
            state.error = ''
            state.categories = action.payload
        },
        modalSelectAnime(state, action: PayloadAction<AnimeData>) {
            state.selectedAnime = action.payload
        },
    },
})

export default animeSlice.reducer
