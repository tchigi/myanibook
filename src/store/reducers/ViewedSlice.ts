import {AnimeData} from "../../models/IAnime";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ViewedState {
    viewedAnimeList: AnimeData[];
    bookList: any
}


const initialState: ViewedState = {
    viewedAnimeList: [],
    bookList: ''
}

export const viewedSlice = createSlice({
    name: 'viewed',
    initialState,
    reducers: {
        addAnimeToViewedList(state, action: PayloadAction<AnimeData>) {
            state.viewedAnimeList.push(action.payload)
        },
        removeAnimeFromViewedList(state, action: PayloadAction<AnimeData>) {
            state.viewedAnimeList = state.viewedAnimeList.filter(item => {
                return item.id !== action.payload.id
            })
        },
    }
})

export default viewedSlice.reducer

