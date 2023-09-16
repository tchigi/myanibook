import React from 'react'
import styled from 'styled-components'
import loader from '../assets/images/loader.gif'

const LoadingStyled = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.9) url(${loader}) center no-repeat;
    z-index: 100;
    border-radius: 20px;

    @media (max-width: 720px) {
        border-radius: 10px;
    }
`
const Loading = () => {
    return <LoadingStyled className={'loader-wrapper'}></LoadingStyled>
}

export default Loading
