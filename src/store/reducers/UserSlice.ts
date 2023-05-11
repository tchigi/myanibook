import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnimeData } from '../../models/IAnime'

interface UserState {
    isAuthorized: boolean,
    nickname: string,
    isNicknameChanging: boolean,
    viewedAnimeSortType: string,
}

const initialState: UserState = {
    isAuthorized: false,
    nickname: '',
    isNicknameChanging: false,
    viewedAnimeSortType: 'sortByDateFirstOld'
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfoAnimeSortHandler(state, action: PayloadAction<string>) {
            state.viewedAnimeSortType = action.payload
        },
        userInfoChangeNicknameBooleanHandler(state, action: PayloadAction<boolean>) {
            state.isNicknameChanging = action.payload
        },
        userInfoChangeNicknameHandler(state, action: PayloadAction<string>) {
            state.nickname = action.payload
        },
    },
})

export default userSlice.reducer
