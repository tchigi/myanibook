import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { userSlice } from '../../../store/reducers/UserSlice'
import axios from 'axios'
import { ApiURL } from '../../../constants/url'
import styled from 'styled-components'

const UserPanelChangeNicknameWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const UserPanelChangeNicknameInputStyled = styled.input.attrs((props) => ({ type: props.type }))`
    height: 30px;
    width: 100%;
    border-radius: 5px;
    padding: 5px 30px 5px 10px;
    font-size: 18px;
    line-height: 30px;
    transition: 0.3s;
    color: #000000;

    &:focus {
        box-shadow: 0 0 20px #ff6600;
        background-color: #000000;
        color: #ffffff;
    }

    &:hover {
        background-color: #000000;
        box-shadow: 0 0 20px #ffffff;
        color: #ffffff;
    }
`
const UserPanelChangeNicknameButtonsWrapperStyled = styled.div`
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    gap: 10px;
`
const UserPanelNicknameChangeChangingButtonStyled = styled.button`
    height: 25px;
    width: 60px;
    padding: 5px;
    border-radius: 5px;
    background-color: #ff6600;

    &:hover {
        background-color: #b84900;
    }
`
const UserPanelNicknameChangeChangingButtonLabelStyled = styled.label`
    font-family: 'Bahnschrift';
    font-size: 16px;
    pointer-events: none;
    color: #ffffff;
`

const UserPanelChangeNicknameInput = () => {
    const [nickname, setNickname] = useState('')
    const [error, setError] = useState('')
    const { userId } = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch()

    function isValidNickname(nickname: string) {
        return /^[a-zA-Z0-9_-]{3,16}$/.test(nickname)
    }
    const onClickClearHandler = () => {
        setNickname('')
    }
    const onClickCancelHandler = () => {
        setNickname('')
        dispatch(userSlice.actions.userInfoChangeNicknameBooleanHandler(false))
    }
    const onClickSaveHandler = () => {
        axios
            .post(
                `${ApiURL}/users-info/nickname`,
                {
                    userId: userId,
                    value: nickname,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {
                dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
                dispatch(userSlice.actions.userInfoChangeNicknameBooleanHandler(false))
                alert('Your nickname has been changed.')
            })
            .catch((e) => {
                setError(e.response.data.message)
            })
    }
    const handleInputNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidNickname(event.target.value)) {
            setError('Nickname is invalid.')
        } else {
            setError('')
        }

        setNickname(event.target.value)
    }

    return (
        <UserPanelChangeNicknameWrapperStyled>
            <UserPanelChangeNicknameInputStyled
                type="text"
                value={nickname}
                onChange={handleInputNicknameChange}
                title={'Enter a new nickname'}
                placeholder={'Enter a new nickname...'}
                pattern={'/^[a-zA-Z0-9_-]{3,16}$/'}
            />
            {error && <h4 className={'error__label'}>{error}</h4>}
            <UserPanelChangeNicknameButtonsWrapperStyled>
                <UserPanelNicknameChangeChangingButtonStyled onClick={onClickSaveHandler}>
                    <UserPanelNicknameChangeChangingButtonLabelStyled>Save</UserPanelNicknameChangeChangingButtonLabelStyled>
                </UserPanelNicknameChangeChangingButtonStyled>
                <UserPanelNicknameChangeChangingButtonStyled onClick={onClickClearHandler}>
                    <UserPanelNicknameChangeChangingButtonLabelStyled>Clear</UserPanelNicknameChangeChangingButtonLabelStyled>
                </UserPanelNicknameChangeChangingButtonStyled>
                <UserPanelNicknameChangeChangingButtonStyled onClick={onClickCancelHandler}>
                    <UserPanelNicknameChangeChangingButtonLabelStyled>Cancel</UserPanelNicknameChangeChangingButtonLabelStyled>
                </UserPanelNicknameChangeChangingButtonStyled>
            </UserPanelChangeNicknameButtonsWrapperStyled>
        </UserPanelChangeNicknameWrapperStyled>
    )
}

export default UserPanelChangeNicknameInput
