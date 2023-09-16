import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const HeaderAuthButtonsStyled = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`
const AuthButtonStyled = styled.button<{ $primary?: boolean }>`
    width: 70px;
    height: 30px;
    background-color: ${(props) => (props.$primary ? '#535b65' : '#ff6600')};
    border-radius: 5px;
    transform: scale(0.95);

    &:hover {
        background-color: ${(props) => (props.$primary ? '#2e3338' : '#b84900')};
    }

    &:active {
        transform: scale(1);
    }
`
const AuthButtonLabelStyled = styled.label`
    font-family: Bahnschrift;
    font-size: 16px;
    color: #ffffff;
    pointer-events: none;
`

const HeaderAuthButtons = () => {
    let navigate = useNavigate()
    const onClickLogInHandler = () => {
        navigate('/login')
    }

    const onClickSignInHandler = () => {
        navigate('/signup')
    }

    return (
        <HeaderAuthButtonsStyled>
            <AuthButtonStyled $primary onClick={onClickLogInHandler}>
                <AuthButtonLabelStyled>Log In</AuthButtonLabelStyled>
            </AuthButtonStyled>
            <AuthButtonStyled onClick={onClickSignInHandler}>
                <AuthButtonLabelStyled>Sign Up</AuthButtonLabelStyled>
            </AuthButtonStyled>
        </HeaderAuthButtonsStyled>
    )
}

export default HeaderAuthButtons
