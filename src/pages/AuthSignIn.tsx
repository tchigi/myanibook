import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthSignIn = () => {
    let navigate = useNavigate()

    const onClickHomeHandler = () => {
        navigate('/home')
    }


    return (
        <div className={'auth-login-wrapper auth__page__wrapper'}>
            <h1 className='auth__page__title'>SIGN IN</h1>
            <div className='auth__form__wrapper'>
                <form action='' className='auth__form'>
                    <div className='auth__form__item__wrapper'>
                        <span className='auth__form__item__label'>Email:</span>
                        <input type='text' className='auth__form__item__input' />
                    </div>
                    <div className='auth__form__item__wrapper'>
                        <span className='auth__form__item__label'>Password:</span>
                        <input type='text' className='auth__form__item__input' />
                    </div>
                    <button className='auth__form__button'>
                        <label className='auth__form__button__label'>Log In</label>
                    </button>
                </form>
            </div>
            <button className='auth-home-button' onClick={onClickHomeHandler}>
                <label className='auth-home-button-label'>← To Home</label>
            </button>
        </div>
    )
}

export default AuthSignIn
