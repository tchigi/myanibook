import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import { decodeToken } from 'react-jwt'
import { IDecodedToken } from '../../models/IDecodedToken'
import axios from 'axios'
import { ApiURL } from '../../constants/url'
import { viewedSlice } from '../../store/reducers/ViewedSlice'

const HeaderUserAvatar = () => {
    const dispatch = useAppDispatch()
    const { isAuthorized, userToken, decodedToken, userId, decodedUserInfo, email, avatar, isLoaded } = useAppSelector(state => state.userReducer)
    const { viewedAnimeList, viewedAnimeDayOfAdditionList } = useAppSelector((state) => state.viewedReducer)
    const [error, setError] = useState('')
    // @ts-ignore
    const nickname = decodedUserInfo.nickname || email

    const onClickLogOutHandler = () => {
        // dispatch(userSlice.actions.userResetUserInfo())
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
                .then((d) => {
                    // // @ts-ignore
                    // dispatch(viewedSlice.actions.addListToViewedList(decodedUserInfo.animeList))
                    // // @ts-ignore
                    // dispatch(viewedSlice.actions.addListToDateOfAdditionList(decodedUserInfo.animeDayOfAdditionList))
                    // dispatch(userSlice.actions.userFlagHandler())
                })


                .catch((e) => {
                    setError(e.response.data.message)
                })
        }
    },[decodedToken])

    // useEffect(() => {
    //     if (isLoaded) {
    //         if (isAuthorized) {
    //             const myJson = JSON.stringify(viewedAnimeList)
    //             const myJsonReplaced = myJson.replaceAll(/"/g, "'")
    //             axios
    //                 .post(
    //                     `${ApiURL}/users-info/anime-list`,
    //                     {
    //                         userId: userId,
    //                         value: myJsonReplaced,
    //                     },
    //                     {
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                     }
    //                 )
    //                 .then((res)=> {
    //                     dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
    //                 })
    //                 .catch((e) => {
    //                     console.log(e)
    //                 })
    //         }
    //     }
    // }, [viewedAnimeList])
    //
    // useEffect(() => {
    //     if (isLoaded) {
    //         if (isAuthorized) {
    //             const myJson = JSON.stringify(viewedAnimeDayOfAdditionList)
    //             const myJsonReplaced = myJson.replaceAll(/"/g, "'")
    //             axios
    //                 .post(
    //                     `${ApiURL}/users-info/anime-day-of-addition-list`,
    //                     {
    //                         userId: userId,
    //                         value: myJsonReplaced,
    //                     },
    //                     {
    //                         headers: {
    //                             'Content-Type': 'application/json',
    //                         },
    //                     }
    //                 )
    //                 .then((res)=> {
    //                     dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
    //                 })
    //                 .catch((e) => {
    //                     console.log(e)
    //                 })
    //         }
    //     }
    // }, [viewedAnimeDayOfAdditionList])

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
