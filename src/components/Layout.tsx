import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <header className={'header'}>
                <div className="nav-container">
                    <NavLink to="/">
                        <div className="title-logo"></div>
                    </NavLink>
                    <nav className="nav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/anime">Anime</NavLink>
                        <NavLink to="/books">Books</NavLink>
                    </nav>
                </div>
                <div className='auth-container'></div>
            </header>
            <Outlet />
            <footer className={'footer'}>2023 by Tchigi</footer>
        </>
    )
}

export default Layout
