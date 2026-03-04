import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IViewedAnimeList } from '../../models/IViewedAnime'

interface ViewedState {
    viewedAnimeDetails: IViewedAnimeList[]
}

const initialState: ViewedState = {
    viewedAnimeDetails: [],
}

export const viewedSlice = createSlice({
    name: 'viewed',
    initialState,
    reducers: {
        setAnimeDetails(state, action: PayloadAction<IViewedAnimeList[]>) {
            const newIds = new Set(action.payload.map((a) => a.id))
            const existing = state.viewedAnimeDetails.filter((a) => !newIds.has(a.id))
            state.viewedAnimeDetails = [...existing, ...action.payload]
        },
    },
})

export default viewedSlice.reducer
