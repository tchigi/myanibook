import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    isAuthorized: boolean,

}

const initialState: UserState = {
    isAuthorized: false,
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
})

export default userSlice.reducer
