import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderAuthButtons = () => {
    let navigate = useNavigate()
    const onClickLogInHandler = () => {
        navigate('/login')
    }

    const onClickSignInHandler = () => {
        navigate('/signin')
    }

    return (
        <div className={'header-auth-buttons-wrapper'}>
            <button className="header-auth__button" onClick={onClickLogInHandler}>
                <label className="header-auth__button__label">Log In</label>
            </button>
            <button className="header-auth__button header-auth__button__sign" onClick={onClickSignInHandler}>
                <label className="header-auth__button__label">Sign Up</label>
            </button>
        </div>
    )
}

export default HeaderAuthButtons
