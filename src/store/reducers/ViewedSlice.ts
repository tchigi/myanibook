import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IViewedAnime from '../../models/IViewedAnime'
import { AnimeData } from '../../models/IAnime'

interface ViewedState {
    viewedAnimeList: IViewedAnime[]
    viewedAnimeDetails: AnimeData[]
}

const initialState: ViewedState = {
    viewedAnimeList: [],
    viewedAnimeDetails: [],
}

export const viewedSlice = createSlice({
    name: 'viewed',
    initialState,
    reducers: {
        addAnimeToViewedList(state, action: PayloadAction<IViewedAnime>) {
            state.viewedAnimeList.push(action.payload)
        },
        addListToViewedList(state, action: PayloadAction<string>) {
            const parsedList = JSON.parse(action.payload)
            state.viewedAnimeList = parsedList
        },
        removeAnimeFromViewedList(state, action: PayloadAction<string>) {
            state.viewedAnimeList = state.viewedAnimeList.filter((item) => item.id !== action.payload)
            state.viewedAnimeDetails = state.viewedAnimeDetails.filter((item) => item.id !== action.payload)
        },
        setAnimeDetails(state, action: PayloadAction<AnimeData[]>) {
            const newIds = new Set(action.payload.map((a) => a.id))
            const existing = state.viewedAnimeDetails.filter((a) => !newIds.has(a.id))
            state.viewedAnimeDetails = [...existing, ...action.payload]
        },
    },
})

export default viewedSlice.reducer
