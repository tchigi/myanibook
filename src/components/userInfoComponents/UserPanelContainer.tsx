import React, { useState } from 'react'
import UserPanelNicknameWrapper from './userPanelComponents/UserPanelNicknameWrapper'
import UserPanelChangeNicknameInput from './userPanelComponents/UserPanelChangeNicknameInput'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'

const UserPanelContainer = () => {
    const path = 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&w=1000&q=80'
    const { isNicknameChanging } = useAppSelector(state => state.userReducer)


    return (
        <>
            <div className="user-panel-avatar-wrapper">
                <div className="user-panel-avatar" title={'Change your avatar'} style={{ backgroundImage: `url(${path})` }}></div>
            </div>
            {isNicknameChanging ? <UserPanelChangeNicknameInput /> : <UserPanelNicknameWrapper />}
        </>
    )
}

export default UserPanelContainer
