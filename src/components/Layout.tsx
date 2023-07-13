import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'


const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <footer className={'footer'}>2023 by Tchigi</footer>
        </>
    )
}

export default Layout
