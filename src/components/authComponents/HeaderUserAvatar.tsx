import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import { decodeToken } from 'react-jwt'
import { IDecodedToken } from '../../models/IDecodedToken'
import axios from 'axios'
import { ApiURL } from '../../constants/url'

const HeaderUserAvatar = () => {
    const dispatch = useAppDispatch()
    const { isAuthorized, userToken, decodedToken, userId, decodedUserInfo, email, avatar } = useAppSelector(state => state.userReducer)
    const [error, setError] = useState('')
    // @ts-ignore
    const nickname = decodedUserInfo.nickname || email

    const onClickLogOutHandler = () => {
        dispatch(userSlice.actions.userResetUserInfo())
    }

    useEffect(() => {
        if (isAuthorized) {
            const decodedTokenWrap:any = decodeToken(userToken)
            dispatch(userSlice.actions.userDecodedTokenHandler(decodedTokenWrap))
            dispatch(userSlice.actions.userInfoChangeUserIdHandler(decodedTokenWrap.id))
            dispatch(userSlice.actions.userInfoChangeEmailHandler(decodedTokenWrap.email))
        }
    },[isAuthorized])

    useEffect(() => {
        if (error) {
            alert(error)
        }
    }, [error])

    useEffect(() => {
        if (decodedToken) {
            axios
                .get(
                    `${ApiURL}/users-info/${userId}`,
                )
                .then((res) => {
                    dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
                    dispatch(userSlice.actions.userAvatarHandler(res.data.avatar))
                })
                .catch((e) => {
                    setError(e.response.data.message)
                })
        }
    },[decodedToken])

    return (
        <div className="header-user-avatar-wrapper" title={'Log Out'} onClick={onClickLogOutHandler}>
            <div className='header-user-nickname'>{nickname}</div>
            {avatar
                ? <div className="header-user-avatar"
                       style={{
                           backgroundImage: `url("${ApiURL}/${avatar}")`,
                }}></div>
                : <div className="header-user-avatar"></div>
            }
        </div>
    )
}

export default HeaderUserAvatar
