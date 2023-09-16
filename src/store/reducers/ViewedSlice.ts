import {AnimeData} from "../../models/IAnime";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import IAnimeDateOfAdditionList from '../../models/IAnimeDateOfAdditionList'

interface ViewedState {
    viewedAnimeList: AnimeData[];
    viewedAnimeDayOfAdditionList: IAnimeDateOfAdditionList[]
    bookList: any
}
const initialState: ViewedState = {
    viewedAnimeList: [],
    viewedAnimeDayOfAdditionList: [],
    bookList: ''
}

export const viewedSlice = createSlice({
    name: 'viewed',
    initialState,
    reducers: {
        addAnimeToViewedList(state, action: PayloadAction<AnimeData>) {
            state.viewedAnimeList.push(action.payload)
        },
        addListToViewedList(state, action: PayloadAction<string>) {
            const parsedList = JSON.parse(action.payload)
            state.viewedAnimeList = parsedList
        },
        removeAnimeFromViewedList(state, action: PayloadAction<AnimeData>) {
            state.viewedAnimeList = state.viewedAnimeList.filter(item => {
                return item.id !== action.payload.id
            })
        },
        addAnimeToDateOfAdditionList(state, action: PayloadAction<IAnimeDateOfAdditionList>) {
            state.viewedAnimeDayOfAdditionList.push(action.payload)
        },
        addListToDateOfAdditionList(state, action: PayloadAction<string>) {
            const parsedListDate = JSON.parse(action.payload)
            state.viewedAnimeDayOfAdditionList = parsedListDate
        },
        removeAnimeFromDateOfAdditionList(state, action: PayloadAction<string>) {
            state.viewedAnimeDayOfAdditionList = state.viewedAnimeDayOfAdditionList.filter(item => {
                return item.id !== action.payload
            })
        }
    }
})

export default viewedSlice.reducer

