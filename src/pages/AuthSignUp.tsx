import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthSignUp = () => {
    let navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');

    function isValidEmail(email: string) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    }

    const handleInputEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid. Example: text@gmail.com');
        } else {
            setError('');
        }

        setEmail(event.target.value);
    };


    const onClickHomeHandler = () => {
        navigate('/')
    }


    const onClickLogInHandler = () => {
        navigate('/login')
    }

    return (
        <div className={'auth-signup-wrapper auth__page__wrapper main'}>
            <div className='auth__page__info_container auth-signup-info-container'>
                <h1 className='auth__page__title'>Start Using MyAniBook</h1>
                <h4 className='auth__page__subtitle'>
                    Join MyAniBook to catalog your anime, compare with your friends, create your own profile, and plenty more. It's Free.
                </h4>
                <div className='auth__form__wrapper'>
                    <form action='' className='auth__form'>
                        <div className='auth__form__item__wrapper'>
                            <span className='auth__form__item__label'>Email</span>
                            <input
                                placeholder={'Email...'}
                                required
                                pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'}
                                value={email}
                                onChange={handleInputEmailChange}
                                type='text'
                                className='auth__form__item__input'
                            />
                            {error && <h4 className={'error__label'}>{error}</h4>}
                        </div>
                        <div className='auth__form__item__wrapper'>
                            <span className='auth__form__item__label'>Password</span>
                            <input
                                placeholder={'Password...'}
                                required
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                type='password'
                                className='auth__form__item__input'
                            />
                        </div>
                        <button className='auth__form__button'>
                            <label className='auth__form__button__label'>Sign Up</label>
                        </button>
                    </form>
                </div>
                <h4 className='auth__page__subtitle'>
                    Already have an account?
                    <button className='auth-signup-button' onClick={onClickLogInHandler}>
                        <label className='auth-signup-button-label'>Log In</label>
                    </button>
                </h4>
                <button className='auth-home-button' onClick={onClickHomeHandler}>
                    <label className='auth-home-button-label'>← To Home</label>
                </button>
            </div>
        </div>
    )
}

export default AuthSignUp
