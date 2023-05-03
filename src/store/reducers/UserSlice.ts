import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnimeData } from '../../models/IAnime'

interface UserState {
    isAuthorized: boolean,
    nickname: string,
    viewedAnimeSortType: string
}

const initialState: UserState = {
    isAuthorized: false,
    nickname: '',
    viewedAnimeSortType: 'sortByDateFirstOld'
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
