import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ApiURL } from '../constants/url'
import { userSlice } from '../store/reducers/UserSlice'
import { useAppDispatch } from '../hooks/redux'
import Loading from '../components/Loading'
import styled from 'styled-components'

const AuthStyled = styled.main`
    display: flex;
    color: #ffffff;
`
const AuthInfoContainerStyled = styled.div`
    position: relative;
    width: 600px;
    height: 800px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin: 0 auto;
    padding: 10px;
    background-color: #25292d;
    border-radius: 20px;

    @media (max-width: 720px) {
        width: 310px;
        height: auto;
        gap: 20px;
        border-radius: 10px;
    }
`
const AuthTitleStyled = styled.h1`
    font-weight: normal;
    text-align: center;

    @media (max-width: 720px) {
        font-size: 18px;
    }
`
const AuthSubTitleStyled = styled.h4`
    font-weight: normal;
    font-size: 20px;
    text-align: center;

    @media (max-width: 720px) {
        font-size: 14px;
    }
`
const AuthFormWrapperStyled = styled.div``
const AuthFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    @media (max-width: 720px) {
        gap: 10px;
    }
`
const AuthFormItemWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 720px) {
        gap: 5px;
    }
`
const AuthFormItemLabelStyled = styled.span`
    color: #ffffff;
    font-size: 18px;
    pointer-events: none;

    @media (max-width: 720px) {
        font-size: 14px;
    }
`
const AuthFormInputStyled = styled.input`
    background: #535b65;
    font-size: 20px;
    padding: 5px;
    color: #ffffff;
    width: 400px;

    @media (max-width: 720px) {
        font-size: 14px;
        width: 290px;
    }
`
const AuthFormItemErrorLabelStyled = styled.h4`
    color: #ff7f7f;

    @media (max-width: 720px) {
        font-size: 14px;
    }
`
const AuthFormButtonStyled = styled.button`
    background: linear-gradient(to bottom, #ff6600, #b84900);
    height: 30px;
    width: 400px;

    &:hover {
        background: linear-gradient(to bottom, rgba(255, 102, 0, 0.5), rgba(184, 73, 0, 0.5));
    }

    @media (max-width: 720px) {
        font-size: 14px;
        width: 290px;
    }
`

const AuthFormSignupButtonStyled = styled.button`
    color: #ff6600;
    background: inherit;

    &:hover {
        color: #b84900;
    }
`
const AuthFormSignupButtonLabelStyled = styled.label`
    padding-left: 5px;
    font-size: 18px;
    pointer-events: none;

    @media (max-width: 720px) {
        font-size: 14px;
    }
`
const AuthFormHomeButtonStyled = styled.button`
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: auto;
    height: 30px;
    background: inherit;
    color: #ff6600;
    transform: scale(0.99);
    &:hover {
        color: #b84900;
    }
    &:active {
        transform: scale(1);
    }
`
const AuthFormHomeButtonLabelStyled = styled.label`
    pointer-events: none;
    font-size: 20px;

    @media (max-width: 720px) {
        font-size: 14px;
    }
`

const AuthLogIn = () => {
    let navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function isValidEmail(email: string) {
        return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)
    }
    const handleInputEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid. Example: text@gmail.com')
        } else {
            setError('')
        }

        setEmail(event.target.value)
    }
    const onClickHomeHandler = () => {
        navigate('/')
    }
    const onClickSignUpHandler = () => {
        navigate('/signup')
    }
    const logInOnClickHandler = (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        axios
            .post(
                `${ApiURL}/auth/login`,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {
                dispatch(userSlice.actions.userTokenHandler(res.data.token))
                dispatch(userSlice.actions.userAuthHandler(true))
                setIsLoading(false)
                navigate('/')
            })
            .catch((e) => {
                setIsLoading(false)
                setError(e.message === 'Network Error' ? 'Sorry! Authorization server is temporarily unavailable.' : e.message)
            })
    }

    return (
        <AuthStyled>
            <AuthInfoContainerStyled>
                {isLoading ? <Loading /> : ''}
                <AuthTitleStyled>Log In</AuthTitleStyled>
                <AuthSubTitleStyled>Welcome back! Please enter your details.</AuthSubTitleStyled>
                <AuthFormWrapperStyled>
                    <AuthFormStyled action="">
                        <AuthFormItemWrapperStyled>
                            <AuthFormItemLabelStyled>Email</AuthFormItemLabelStyled>
                            <AuthFormInputStyled placeholder={'Email...'} required pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'} value={email} onChange={handleInputEmailChange} type="text" />
                            {error && <AuthFormItemErrorLabelStyled>{error}</AuthFormItemErrorLabelStyled>}
                        </AuthFormItemWrapperStyled>
                        <AuthFormItemWrapperStyled>
                            <AuthFormItemLabelStyled>Password</AuthFormItemLabelStyled>
                            <AuthFormInputStyled placeholder={'Password...'} required value={password} onChange={(e: any) => setPassword(e.target.value)} type="password" />
                        </AuthFormItemWrapperStyled>
                        <AuthFormButtonStyled onClick={logInOnClickHandler}>
                            <AuthFormItemLabelStyled>Log In</AuthFormItemLabelStyled>
                        </AuthFormButtonStyled>
                    </AuthFormStyled>
                </AuthFormWrapperStyled>
                <AuthSubTitleStyled>
                    Don't have an account?
                    <AuthFormSignupButtonStyled onClick={onClickSignUpHandler}>
                        <AuthFormSignupButtonLabelStyled>Sign Up</AuthFormSignupButtonLabelStyled>
                    </AuthFormSignupButtonStyled>
                </AuthSubTitleStyled>
                <AuthFormHomeButtonStyled onClick={onClickHomeHandler}>
                    <AuthFormHomeButtonLabelStyled>← To Home</AuthFormHomeButtonLabelStyled>
                </AuthFormHomeButtonStyled>
            </AuthInfoContainerStyled>
        </AuthStyled>
    )
}

export default AuthLogIn
