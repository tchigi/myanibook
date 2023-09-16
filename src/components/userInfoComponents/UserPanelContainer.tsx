import React, { useState } from 'react'
import UserPanelNicknameWrapper from './userPanelComponents/UserPanelNicknameWrapper'
import UserPanelChangeNicknameInput from './userPanelComponents/UserPanelChangeNicknameInput'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import axios from 'axios'
import { ApiURL } from '../../constants/url'
import styled from 'styled-components'
import anonAvatar from '../../assets/images/anon-avatar.png'
import edit from '../../assets/images/edit.png'

const UserPanelContainerStyled = styled.div`
    width: 100%;
    height: 250px;
`
const UserPanelAvatarStyled = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(${anonAvatar});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    border: 3px #ff6600 solid;
    cursor: pointer;

    &::before {
        display: none;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
    }

    &::after {
        display: none;
        content: '';
        position: absolute;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(${edit}) no-repeat center;
        background-size: cover;
        border-radius: 50%;
        filter: invert(71%) sepia(69%) saturate(7052%) hue-rotate(2deg) brightness(103%) contrast(105%);
    }
    &:hover::after,
    &:hover::before {
        display: block;
    }
`
const UserPanelChangeAvatarWrapperStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    & .inputfile + label {
        width: 60%;
        height: 25px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        background-color: #ff6600;
        border-radius: 5px;
        display: inline-block;
        text-align: center;
        line-height: 27px;
    }

    & .inputfile:focus + label,
    & .inputfile + label:hover {
        background-color: #b84900;
    }

    & .inputfile + label {
        cursor: pointer;
    }
`

const UserPanelContainer = () => {
    const dispatch = useAppDispatch()
    const { isNicknameChanging, userId, avatar } = useAppSelector((state) => state.userReducer)
    const [isAvatarChanging, setIsAvatarChanging] = useState(false)

    const onChangeAvatarHandler = (e: any) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('userId', `${userId}`)
        formData.append('image', file)
        axios
            .post(`${ApiURL}/users-info/avatar`, formData)
            .then((res) => {
                dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
                dispatch(userSlice.actions.userAvatarHandler(res.data.avatar))
            })
            .then(() => {
                setIsAvatarChanging(false)
                alert('Your avatar has been changed.')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const onClickAvatarHandler = () => {
        setIsAvatarChanging(!isAvatarChanging)
    }

    return (
        <>
            <UserPanelContainerStyled onClick={onClickAvatarHandler}>
                {avatar ? (
                    <UserPanelAvatarStyled
                        title={'Change your avatar'}
                        style={{
                            backgroundImage: `url("${ApiURL}/${avatar}")`,
                        }}></UserPanelAvatarStyled>
                ) : (
                    <UserPanelAvatarStyled title={'Change your avatar'}></UserPanelAvatarStyled>
                )}
            </UserPanelContainerStyled>
            <UserPanelChangeAvatarWrapperStyled className={isAvatarChanging ? '' : 'hidden'}>
                <input type="file" name="file" id="file" className="inputfile" accept={'image/*'} onChange={onChangeAvatarHandler} />
                <label htmlFor="file">Choose file...</label>
            </UserPanelChangeAvatarWrapperStyled>
            {isNicknameChanging ? <UserPanelChangeNicknameInput /> : <UserPanelNicknameWrapper />}
        </>
    )
}

export default UserPanelContainer
