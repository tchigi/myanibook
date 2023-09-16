import React from 'react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AnimeList from './pages/AnimeList'
import NotFoundPage from './pages/NotFoundPage'
import UserInfo from './pages/UserInfo'
import AuthLogIn from './pages/AuthLogIn'
import AuthSignUp from './pages/AuthSignUp'
import styled, { createGlobalStyle } from 'styled-components'

const WrapperStyled = styled.div`
    min-height: 100vh;
    width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 720px) {
        width: 320px;
    }
`
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
  }
  
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  :focus,
  :active {
    outline: none;
  }
  
  a:focus,
  a:active {
    outline: none;
  }
  
  nav,
  footer,
  header,
  aside {
    display: block;
  }
  
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1;
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  
  input,
  button,
  textarea {
    font-family: inherit;
  }
  
  input::-ms-clear {
    display: none;
  }
  
  button {
    cursor: pointer;
  }
  
  button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
  
  a,
  a:visited {
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: none;
  }
  
  ul li {
    list-style: none;
  }
  
  img {
    vertical-align: top;
  }
  
  .hidden {
    display: none;
  }
  .scroll-hidden {
    overflow: hidden;
  }
  h1 {
    width: 100%;
    text-align: center;
  }
  
  body {
    background: #1c1f22;
    color: #ffffff;
    scroll-behavior: smooth;
    font-family: Lato,sans-serif;
  }

  body::-webkit-scrollbar {
    width: 5px;
  }

  body::-webkit-scrollbar-track {
    background: inherit;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #535b65;
    border-radius: 20px;
    border: 1px solid #535b65;
  }
  
  main {
    flex: 1;
    padding-top: 70px;
  }
  footer {
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 720px) {
    main {
      padding: 50px 5px 0;
    }
  }
`

function App() {
    return (
        <React.Fragment>
            <GlobalStyle />
            <WrapperStyled>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="anime" element={<AnimeList />} />
                        <Route path="user" element={<UserInfo />} />
                        <Route path="*" element={<NotFoundPage />} />
                        <Route path="login" element={<AuthLogIn />} />
                        <Route path="signup" element={<AuthSignUp />} />
                    </Route>
                </Routes>
            </WrapperStyled>
        </React.Fragment>
    )
}

export default App
