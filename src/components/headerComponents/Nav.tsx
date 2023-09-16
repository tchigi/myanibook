import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavStyled = styled.nav`
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    color: #ffffff;
    font-size: 20px;
    text-transform: capitalize;
    font-weight: bold;
    transition: all 0.5s ease;

    & a {
        color: #ffffff;
    }
    & a:hover {
        color: #b84900;
    }

    .active-link {
        color: #ff6600 !important;
    }
  
    @media (max-width: 720px) {
        display: none;
    }
`

const Nav = () => {
    const setActive = ({ isActive, isPending }: any) => (isPending ? 'pending-link' : isActive ? 'active-link' : '')

    return (
        <NavStyled className="nav">
            <NavLink to="/" end className={setActive}>
                Home
            </NavLink>
            <NavLink to="/anime" className={setActive}>
                Anime
            </NavLink>
            <NavLink to="/user" className={setActive}>
                {' '}
                AnimeList
            </NavLink>
        </NavStyled>
    )
}

export default Nav
