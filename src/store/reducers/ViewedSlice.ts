import {AnimeData} from "../../models/IAnime";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {log} from "util";

interface ViewedState {
    animeList: AnimeData[];
    bookList: any
}


const initialState: ViewedState = {
    animeList: [],
    bookList: ''
}

export const viewedSlice = createSlice({
    name: 'viewed',
    initialState,
    reducers: {
        addAnimeToViewedList(state, action: PayloadAction<AnimeData>) {
            state.animeList.push(action.payload)
        },
        removeAnimeFromViewedList(state, action: PayloadAction<AnimeData>) {
            state.animeList = state.animeList.filter(item => {
                return item.id !== action.payload.id
            })
        },
    }
})

export default viewedSlice.reducer

