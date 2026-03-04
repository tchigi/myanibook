import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import image from '../assets/images/Lenore_Infobox.png'

const HomepageWrapperMainStyled = styled.main`
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`
const HomepageDescriptionBlockStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 250px;
    gap: 30px;

    @media (max-width: 768px) {
        padding-top: 80px;
    }

    @media (max-width: 480px) {
        padding-top: 10px;
    }
`
const HomepageDescriptionTitleStyled = styled.span`
    font-weight: bold;
    font-size: 28px;

    & br {
        display: none;
    }

    @media (max-width: 768px) {
        font-size: 24px;
    }

    @media (max-width: 480px) {
        font-size: 24px;
        text-align: left;
        align-self: flex-start;

        & br {
            display: inline;
        }
    }
`
const HomepageDescriptionTextStyled = styled.span`
    font-size: 20px;
    line-height: 1.5;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        text-align: left;
    }
`
const HomepageButtonStyled = styled(Link)`
    background: linear-gradient(to bottom, #ff6600, #b84900);
    width: 250px;
    height: 50px;
    align-self: center;
    border-radius: 30px;
    transform: scale(0.99);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #ffffff;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: lighter;

    &:hover {
        background: linear-gradient(to bottom, rgba(255, 102, 0, 0.5), rgba(184, 73, 0, 0.5));
    }

    &:active {
        transform: scale(1);
    }

    @media (max-width: 768px) {
        width: 200px;
        height: 45px;
        font-size: 18px;
    }

    @media (max-width: 480px) {
        width: 150px;
        height: 40px;
        align-self: flex-start;
        font-size: 16px;
    }
`
const HomepageImageBlockStyled = styled.figure`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        order: -1;
    }
`
const HomepageImageWrapperStyled = styled.div`
    width: 750px;
    height: 750px;
    border-radius: 50%;
    background: radial-gradient(#ff6600, #1c1f22 70%);

    @media (max-width: 768px) {
        width: 450px;
        height: 450px;
    }

    @media (max-width: 480px) {
        width: 300px;
        height: 300px;
    }
`
const HomepageImageStyled = styled.img.attrs((props) => ({
    src: props.src,
}))`
    width: 750px;
    height: 750px;

    @media (max-width: 768px) {
        width: 450px;
        height: 450px;
    }

    @media (max-width: 480px) {
        width: 300px;
        height: 300px;
    }
`

const HomePage = () => {
    return (
        <HomepageWrapperMainStyled>
            <HomepageDescriptionBlockStyled>
                <HomepageDescriptionTitleStyled>
                    Create your list.
                    <br /> Don't forget anything!
                </HomepageDescriptionTitleStyled>
                <HomepageDescriptionTextStyled>MyAniBook is a project designed to create a list of watched anime.</HomepageDescriptionTextStyled>
                <HomepageButtonStyled to={'anime'}>Start</HomepageButtonStyled>
            </HomepageDescriptionBlockStyled>
            <HomepageImageBlockStyled>
                <HomepageImageWrapperStyled>
                    <HomepageImageStyled src={image}></HomepageImageStyled>
                </HomepageImageWrapperStyled>
            </HomepageImageBlockStyled>
        </HomepageWrapperMainStyled>
    )
}

export default HomePage
