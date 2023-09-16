import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components'

const FooterStyled = styled.footer`
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 14px;

    @media (max-width: 720px) {
        font-size: 12px;
    }
`
const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <FooterStyled>2023 by Tchigi</FooterStyled>
        </>
    )
}

export default Layout
