import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const BurgerNavStyled = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 30px;

    & a {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 5px;
        height: 20px;
        color: #ffffff;
    }

    & p {
        height: 16px;
        font-size: 16px;
        font-weight: bold;
        line-height: 16px;
    }

    & a:hover {
        color: #b84900;
    }

    .active-link {
        color: #ff6600 !important;
    }
    .active-link svg {
        color: #ff6600 !important;
        fill: #ff6600;
        stroke: #ff6600;
    }

    & svg {
        fill: #d9d9d9;
        stroke: #d9d9d9;
    }
`

const BurgerNav = () => {
    const setActive = ({ isActive, isPending }: any) => (isPending ? 'pending-link' : isActive ? 'active-link' : '')

    return (
        <BurgerNavStyled>
            <NavLink to="/" end className={setActive}>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_104_22)">
                        <path d="M10 0L20.3923 11.25H-0.392304L10 0Z" />
                        <rect x="2" y="14" width="6" height="6" />
                        <rect x="12" y="14" width="6" height="6" />
                        <rect x="2" y="11" width="16" height="3" />
                    </g>
                    <defs>
                        <clipPath id="clip0_104_22">
                            <rect width="20" height="20" />
                        </clipPath>
                    </defs>
                </svg>
                <p>Home</p>
            </NavLink>
            <NavLink to="/anime" className={setActive}>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_104_12)">
                        <rect width="13" height="20" />
                        <rect x="15" y="2" width="2" height="16" />
                        <rect x="19" y="4" width="1" height="12" />
                    </g>
                    <defs>
                        <clipPath id="clip0_104_12">
                            <rect width="20" height="20" />
                        </clipPath>
                    </defs>
                </svg>
                <p>Anime</p>
            </NavLink>
            <NavLink to="/user" className={setActive}>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <rect y="1" width="20" height="2" />
                    <rect y="5" width="15" height="2" />
                    <rect y="9" width="20" height="2" />
                    <rect y="13" width="15" height="2" />
                    <rect y="17" width="20" height="2" />
                </svg>
                <p>AnimeList</p>
            </NavLink>
        </BurgerNavStyled>
    )
}

export default BurgerNav
