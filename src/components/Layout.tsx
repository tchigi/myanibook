import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const setActive = ({ isActive }: any) => (isActive ? 'active-link' : '')

const Layout = () => {
    return (
        <>
            <header className={'header'}>
                <div className="nav-container">
                    <NavLink to="/">
                        <div className="title-logo"></div>
                    </NavLink>
                    <nav className="nav">
                        <NavLink to="/" end className={setActive}>
                            Home
                        </NavLink>
                        <NavLink to="/anime" className={setActive}>
                            Anime
                        </NavLink>
                        <NavLink to="/books" className={setActive}>
                            {' '}
                            Books
                        </NavLink>
                    </nav>
                </div>
                <div className="auth-container"></div>
            </header>
            <Outlet />
            <footer className={'footer'}>2023 by Tchigi</footer>
        </>
    )
}

export default Layout
