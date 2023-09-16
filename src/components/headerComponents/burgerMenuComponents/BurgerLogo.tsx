import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import title from '../../../assets/images/title.png'

const BurgerLogoStyled = styled.div`
    width: 150px;
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

`
const BurgerLogo = () => {
    return (
        <NavLink to="/">
            <BurgerLogoStyled className="title-logo"></BurgerLogoStyled>
        </NavLink>
    )
}

export default BurgerLogo
