import React from 'react'
import { useAppSelector } from '../../../hooks/redux'
import HeaderUserAvatar from '../authComponents/HeaderUserAvatar'
import HeaderAuthButtons from '../authComponents/HeaderAuthButtons'

const AuthContainer = () => {
    const { isAuthorized } = useAppSelector((state) => state.userReducer)

    return <div className="burger-header-auth-container">{isAuthorized ? <HeaderUserAvatar /> : <HeaderAuthButtons />}</div>
}

export default AuthContainer
