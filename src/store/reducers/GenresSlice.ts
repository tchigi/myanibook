import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GenreData, IGenre } from '../../models/IGenre'

interface GenresState {
    genres: IGenre,

    isLoading: boolean,
    error: string,
    currentGenres: GenreData[],
    currentGenresRequest: string
}

const initialState: GenresState = {
    genres: {
        data: [],
        meta: [],
        links: [],
    },
    isLoading: false,
    error: '',
    currentGenres: [],
    currentGenresRequest: ''
}
export const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        genresFetching(state) {
            state.isLoading = true
        },
        genresFetchingSuccess(state, action: PayloadAction<IGenre>) {
            state.isLoading = false
            state.error = ''
            state.genres = action.payload
        },
        animeListFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        addToCurrentGenres(state, action: PayloadAction<any>) {
            state.currentGenres = action.payload
        },
        clearCurrentGenres(state) {
            state.currentGenres = []
        },
        currentGenresRequestHandler(state, action: PayloadAction<string>) {
            state.currentGenresRequest = action.payload
        }
    },
})

export default genresSlice.reducer
