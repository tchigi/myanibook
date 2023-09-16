import React from 'react'
import Search from './headerComponents/Search'
import AuthContainer from './headerComponents/AuthContainer'
import Nav from './headerComponents/Nav'
import Logo from './headerComponents/Logo'
import BurgerMenu from './headerComponents/BurgerMenu'
import styled from 'styled-components'

const HeaderStyled = styled.header`
    z-index: 1000;
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #1c1f22;

    @media (max-width: 720px) {
        left: 50%;
        transform: translateX(-50%);
        width: 320px;
        height: 50px;
        padding: 0 5px;
    }
`

function Header() {
    return (
        <HeaderStyled className={'header'}>
            <Logo />
            <Nav />
            <Search />
            <AuthContainer />
            <BurgerMenu />
        </HeaderStyled>
    )
}

export default Header
