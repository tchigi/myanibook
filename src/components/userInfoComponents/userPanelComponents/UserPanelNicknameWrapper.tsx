import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { userSlice } from '../../../store/reducers/UserSlice'

const UserPanelNicknameWrapper = () => {
    const dispatch = useAppDispatch()
    const { decodedUserInfo, email } = useAppSelector(state => state.userReducer)
    // @ts-ignore
    const nickname = decodedUserInfo.nickname || email

    const onClickHandler = () => {
        dispatch(userSlice.actions.userInfoChangeNicknameBooleanHandler(true))
    }

    return (
        <div className="user-panel-nickname-wrapper">
            <div className={`user-panel-nickname`}>{nickname}</div>
            <button className='user-panel-change-nickname-button' title={'Change your nickname'} onClick={onClickHandler}></button>
        </div>
    )
}

export default UserPanelNicknameWrapper
