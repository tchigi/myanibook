import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { userSlice } from '../../../store/reducers/UserSlice'
import { decodeToken } from 'react-jwt'
import axios from 'axios'
import { ApiURL } from '../../../constants/url'
import { viewedSlice } from '../../../store/reducers/ViewedSlice'
import styled from 'styled-components'
import logout from '../../../assets/images/logout.png'
import anonAvatar from '../../../assets/images/anon-avatar.png'

const HeaderUserAvatarWrapperStyled = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`
const HeaderUserNicknameStyled = styled.div`
    color: #ffffff;
    font-size: 20px;
    font-family: Bahnschrift;
`

const HeaderUserAvatarStyled = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    background-image: url(${anonAvatar});
    background-repeat: no-repeat;
    background-position: center;
    -webkit-background-size: cover;
    background-size: cover;
    border-radius: 50%;
    border: 3px #ff6600 solid;
    cursor: pointer;

    &:before {
        display: none;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #2e3338;
        opacity: 0.5;
    }

    &:after {
        display: none;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        background-image: url(${logout});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        filter: invert(100%) sepia(40%) saturate(0%) hue-rotate(77deg) brightness(108%) contrast(101%);
    }

    &:hover:after,
    &:hover:before {
        display: block;
    }

    &:active {
        transform: scale(1.1);
    }
`

const HeaderUserAvatar = () => {
    const dispatch = useAppDispatch()
    const { isAuthorized, userToken, decodedToken, userId, decodedUserInfo, email, avatar, isLoaded } = useAppSelector((state) => state.userReducer)
    const { viewedAnimeList } = useAppSelector((state) => state.viewedReducer)
    const [error, setError] = useState('')
    // @ts-ignore
    const nickname = decodedUserInfo.nickname || email

    const onClickLogOutHandler = () => {
        dispatch(userSlice.actions.userResetUserInfo())
        dispatch(viewedSlice.actions.addListToViewedList('[]'))
    }

    useEffect(() => {
        if (isAuthorized) {
            const decodedTokenWrap: any = decodeToken(userToken)
            dispatch(userSlice.actions.userDecodedTokenHandler(decodedTokenWrap))
            dispatch(userSlice.actions.userInfoChangeUserIdHandler(decodedTokenWrap.id))
            dispatch(userSlice.actions.userInfoChangeEmailHandler(decodedTokenWrap.email))
        }
    }, [isAuthorized])

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error])

    useEffect(() => {
        if (decodedToken) {
            axios
                .get(`${ApiURL}/users-info/${userId}`)
                .then((res) => {
                    dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
                    dispatch(userSlice.actions.userAvatarHandler(res.data.avatar))
                    if (res.data.animeList !== null) {
                        dispatch(viewedSlice.actions.addListToViewedList(res.data.animeList))
                    }
                    dispatch(userSlice.actions.userFlagHandler(true))
                })
                .catch((e) => {
                    setError(e.response.data.message)
                })
        }
    }, [decodedToken])

    useEffect(() => {
        if (isLoaded) {
            if (isAuthorized) {
                axios
                    .post(
                        `${ApiURL}/users-info/anime-list`,
                        {
                            userId: userId,
                            value: JSON.stringify(viewedAnimeList),
                        },
                        {
                            headers: { Authorization: `Bearer ${userToken}` },
                        }
                    )
                    .then((res) => {
                        dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }, [viewedAnimeList])

    return (
        <HeaderUserAvatarWrapperStyled title={'Log Out'} onClick={onClickLogOutHandler}>
            <HeaderUserNicknameStyled>{nickname}</HeaderUserNicknameStyled>
            {avatar ? (
                <HeaderUserAvatarStyled
                    style={{
                        backgroundImage: `url("${ApiURL}/${avatar}")`,
                    }}></HeaderUserAvatarStyled>
            ) : (
                <HeaderUserAvatarWrapperStyled></HeaderUserAvatarWrapperStyled>
            )}
        </HeaderUserAvatarWrapperStyled>
    )
}

export default HeaderUserAvatar
