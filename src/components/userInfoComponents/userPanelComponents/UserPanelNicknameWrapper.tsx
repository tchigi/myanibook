import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { userSlice } from '../../../store/reducers/UserSlice'
import styled from 'styled-components'
import edit from '../../../assets/images/edit.png'

const UserPanelNicknameWrapperStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: space-evenly;
`
const UserPanelNicknameStyled = styled.div`
    font-family: 'Bahnschrift';
    font-size: 26px;
    word-break: break-word;
`
const UserPanelChangeNicknameButtonStyled = styled.button`
    width: 30px;
    height: 30px;
    background: url(${edit}) no-repeat center;
    background-size: cover;
    filter: invert(94%) sepia(50%) saturate(2%) hue-rotate(20deg) brightness(118%) contrast(101%);
    transform: scale(0.95);

    &:hover {
        filter: invert(71%) sepia(69%) saturate(7052%) hue-rotate(2deg) brightness(103%) contrast(105%);
        transform: scale(1);
    }
`

const UserPanelNicknameWrapper = () => {
    const dispatch = useAppDispatch()
    const { decodedUserInfo, email } = useAppSelector((state) => state.userReducer)
    // @ts-ignore
    const nickname = decodedUserInfo.nickname || email

    const onClickHandler = () => {
        dispatch(userSlice.actions.userInfoChangeNicknameBooleanHandler(true))
    }

    return (
        <UserPanelNicknameWrapperStyled>
            <UserPanelNicknameStyled>{nickname}</UserPanelNicknameStyled>
            <UserPanelChangeNicknameButtonStyled title={'Change your nickname'} onClick={onClickHandler}></UserPanelChangeNicknameButtonStyled>
        </UserPanelNicknameWrapperStyled>
    )
}

export default UserPanelNicknameWrapper
