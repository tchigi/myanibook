import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnimeData } from '../../models/IAnime'
import { ICategories } from '../../models/ICategories'
import { IDecodedToken, IDecodedUserInfo } from '../../models/IDecodedToken'

interface UserState {
    isAuthorized: boolean
    nickname: string
    isNicknameChanging: boolean
    email: string,
    avatar: string
    viewedAnimeSortType: string
    userToken: string
    userId: number
    error: string
    isLoaded: boolean
    decodedToken: string | IDecodedToken,
    decodedUserInfo: string | IDecodedUserInfo,
}

const initialState: UserState = {
    isAuthorized: false,
    nickname: '',
    isNicknameChanging: false,
    email: '',
    avatar: '',
    viewedAnimeSortType: 'sortByDateFirstOld',
    userToken: '',
    userId: NaN,
    error: '',
    isLoaded: false,
    decodedToken: '',
    decodedUserInfo: '',
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAuthHandler(state, action: PayloadAction<boolean>) {
            state.isAuthorized = action.payload
        },
        userFlagHandler(state, action: PayloadAction<boolean>) {
            state.isLoaded = action.payload
        },
        userTokenHandler(state, action: PayloadAction<string>) {
            state.userToken = action.payload
        },
        userAvatarHandler(state, action: PayloadAction<string>) {
            state.avatar = action.payload
        },
        userDecodedTokenHandler(state, action: PayloadAction<IDecodedToken>) {
            state.decodedToken = action.payload
        },
        userDecodedUserInfoHandler(state, action: PayloadAction<IDecodedUserInfo>) {
            state.decodedUserInfo = action.payload
        },
        userInfoAnimeSortHandler(state, action: PayloadAction<string>) {
            state.viewedAnimeSortType = action.payload
        },
        userInfoChangeNicknameBooleanHandler(state, action: PayloadAction<boolean>) {
            state.isNicknameChanging = action.payload
        },
        userInfoChangeNicknameHandler(state, action: PayloadAction<string>) {
            state.nickname = action.payload
        },
        userInfoChangeEmailHandler(state, action: PayloadAction<string>) {
            state.email = action.payload
        },
        userInfoChangeUserIdHandler(state, action: PayloadAction<number>) {
            state.userId = action.payload
        },
        userResetUserInfo(state) {
            state.isAuthorized = false
            state.nickname = ''
            state.isNicknameChanging = false
            state.email = ''
            state.avatar = ''
            state.viewedAnimeSortType = 'sortByDateFirstOld'
            state.userToken = ''
            state.userId = NaN
            state.error = ''
            state.isLoaded = false
            state.decodedToken = ''
            state.decodedUserInfo = ''
        },
    },
})

export default userSlice.reducer
