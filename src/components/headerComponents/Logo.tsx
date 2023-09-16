import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import title from '../../assets/images/title.png'

const LogoStyled = styled.div`
    width: 200px;
    height: 50px;
    background-image: url(${title});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    transition: 0.3s;
    transform: scale(0.99);

    &:hover {
        transform: scale(1);
    }

    @media (max-width: 720px) {
      width: 150px;
    }
`
const Logo = () => {
    return (
        <NavLink to="/">
            <LogoStyled className="title-logo"></LogoStyled>
        </NavLink>
    )
}

export default Logo
