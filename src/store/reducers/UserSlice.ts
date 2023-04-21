import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnimeData } from '../../models/IAnime'

interface UserState {
    isAuthorized: boolean,
    viewedAnimeSortType: string
}

const initialState: UserState = {
    isAuthorized: false,
    viewedAnimeSortType: 'sortByDate'
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfoAnimeSortHandler(state, action: PayloadAction<string>) {
            state.viewedAnimeSortType = action.payload
        },
    },
})

export default userSlice.reducer
