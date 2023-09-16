import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import HeaderUserAvatar from './authComponents/HeaderUserAvatar'
import HeaderAuthButtons from './authComponents/HeaderAuthButtons'
import styled from 'styled-components'

const AuthContainerStyled = styled.div`
    @media (max-width: 720px) {
        display: none;
    }
`
const AuthContainer = () => {
    const { isAuthorized } = useAppSelector((state) => state.userReducer)

    return <AuthContainerStyled>{isAuthorized ? <HeaderUserAvatar /> : <HeaderAuthButtons />}</AuthContainerStyled>
}

export default AuthContainer
