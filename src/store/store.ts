import {combineReducers, configureStore} from "@reduxjs/toolkit";
import animeReducer from './reducers/AnimeSlice'
import paginationReducer from './reducers/PaginationSlice'
import viewedReducer from './reducers/ViewedSlice'

const rootReducer = combineReducers({
    animeReducer, paginationReducer, viewedReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
