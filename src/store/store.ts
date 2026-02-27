import {combineReducers, configureStore} from "@reduxjs/toolkit";
import animeReducer from './reducers/AnimeSlice'
import paginationReducer from './reducers/PaginationSlice'
import genresReducer from './reducers/GenresSlice'
import userReducer from './reducers/UserSlice'
import categoriesReducer from './reducers/CategoriesSlice'
import viewedReducer from './reducers/ViewedSlice'

const rootReducer = combineReducers({
    animeReducer, paginationReducer, genresReducer, userReducer, categoriesReducer, viewedReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
