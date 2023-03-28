import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaginationState {
    animeListCurrentPage: number,
    animeListMaxOffset:number
}

const initialState: PaginationState = {
    animeListCurrentPage: 0,
    animeListMaxOffset: 0
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        animeListSetCurrentPage(state, action: PayloadAction<number>) {
            state.animeListCurrentPage = action.payload
        },
        animeListSetMaxOffset(state, action: PayloadAction<number>) {
            state.animeListMaxOffset = action.payload
        },
    },
})

export default paginationSlice.reducer
