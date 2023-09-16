import React, { useState } from 'react'
import BurgerNav from './burgerMenuComponents/BurgerNav'
import BurgerAuthContainer from './burgerMenuComponents/BurgerAuthContainer'
import styled from 'styled-components'
import BurgerSearch from './burgerMenuComponents/BurgerSearch'
import BurgerLogo from './burgerMenuComponents/BurgerLogo'

const BurgerMenuStyled = styled.div`
    position: relative;
    display: none;

    @media (max-width: 720px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: auto;
        height: 20px;
        width: 20px;
        cursor: pointer;

        &::after,
        &::before {
            z-index: 201;
            content: '';
            position: absolute;
            left: 0;
            width: 20px;
            height: 2px;
            background-color: #d9d9d9;
            transition: 0.3s;
        }

        &::after {
            top: 2px;
        }

        &::before {
            bottom: 2px;
        }
        &.active::after {
            top: 50%;
            transform: rotate(-45deg) translate(0, -50%);
        }
        &.active::before {
            bottom: 50%;
            transform: rotate(45deg) translate(0, 50%);
        }

        &.active span {
            transform: scale(0);
        }
    }
`

const BurgerMenuSpanStyled = styled.span`
    display: block;
    width: 20px;
    height: 2px;
    background-color: #d9d9d9;
`

const BurgerMenuBgStyled = styled.div`
    @media (max-width: 720px) {
        padding: 50px 25px;
        z-index: 200;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        position: fixed;
        width: 100%;
        height: 100vh;
        background: #1c1f22;
        top: 0;
        left: 0;
        transition: 0.3s;
        transform: translateX(200%);
      
        hr {
          width: 100%;
          height: 1px;
          background: #b84900;
        }

        * {
          z-index: 202;
        }
      
        &.active {
            transform: translateX(0);
        }
      
        :last-child {
          margin-top: auto;
        }
    }
`

const BurgerMenu = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    function onClickHandler() {
        setIsActive((prev) => !prev)
    }

    return (
        <BurgerMenuStyled className={`${isActive ? 'active' : ''}`} onClick={onClickHandler}>
            <BurgerMenuSpanStyled></BurgerMenuSpanStyled>
            <BurgerMenuBgStyled className={`${isActive ? 'active' : ''}`} >
                <BurgerSearch setIsActive={setIsActive}/>
                <hr/>
                <BurgerNav/>
                <hr/>
                <BurgerAuthContainer />
                <BurgerLogo />
            </BurgerMenuBgStyled>
        </BurgerMenuStyled>
    )
}

export default BurgerMenu
