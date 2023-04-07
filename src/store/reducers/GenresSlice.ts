import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GenreData, IGenre } from '../../models/IGenre'

interface GenresState {
    genres: IGenre,

    isLoading: boolean,
    error: string,
    currentGenres: GenreData[]
}

const initialState: GenresState = {
    genres: {
        data: [],
        meta: [],
        links: [],
    },
    isLoading: false,
    error: '',
    currentGenres: []
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
        addToCurrentGenres(state, action: PayloadAction<GenreData>) {
            state.currentGenres.push(action.payload)
        },
        removeFromCurrentGenres(state, action: PayloadAction<GenreData>) {
            state.currentGenres = state.currentGenres.filter(item => {
                return item.id !== action.payload.id
            })
        }
    },
})

export default genresSlice.reducer
