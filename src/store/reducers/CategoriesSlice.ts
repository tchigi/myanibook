import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoriesData, ICategories } from '../../models/ICategories'

interface CategoriesState {
    categories: ICategories,
    isLoading: boolean,
    error: string,
    currentCategories: CategoriesData[],
    currentCategoriesRequest: string
}

const initialState: CategoriesState = {
    categories: {
        data: [],
        meta: [],
        links: [],
    },
    isLoading: false,
    error: '',
    currentCategories: [],
    currentCategoriesRequest: ''
}
export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoriesFetching(state) {
            state.isLoading = true
        },
        categoriesFetchingSuccess(state, action: PayloadAction<ICategories>) {
            state.isLoading = false
            state.error = ''
            state.categories = action.payload
        },
        animeListFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        addToCurrentCategories(state, action: PayloadAction<any>) {
            state.currentCategories = action.payload
        },
        clearCurrentCategories(state) {
            state.currentCategories = []
        },
        currentCategoriesRequestHandler(state, action: PayloadAction<string>) {
            state.currentCategoriesRequest = action.payload
        }
    },
})

export default categoriesSlice.reducer
