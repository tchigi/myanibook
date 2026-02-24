import React from 'react'
import styled, { keyframes } from 'styled-components'

const spinPulse = keyframes`
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.18); }
    100% { transform: rotate(360deg) scale(1); }
`

const corePulse = keyframes`
    0%, 100% { box-shadow: 0 0 6px 2px rgba(255, 140, 0, 0.5); }
    50%       { box-shadow: 0 0 18px 6px rgba(255, 140, 0, 0.95); }
`

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(16, 18, 20, 0.86);
    z-index: 100;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 720px) {
        border-radius: 10px;
    }
`

const starClip = 'polygon(50% 0%, 64% 36%, 100% 50%, 64% 64%, 50% 100%, 36% 64%, 0% 50%, 36% 36%)'

const Shuriken = styled.div`
    position: relative;
    width: 64px;
    height: 64px;
    animation: ${spinPulse} 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        clip-path: ${starClip};
        background: linear-gradient(45deg, #ffa040, #c43c00);
    }
`

const Core = styled.div`
    position: absolute;
    width: 12px;
    height: 12px;
    background: #fff4e0;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${corePulse} 1.5s ease-in-out infinite;
`

const Loading = () => (
    <Overlay className={'loader-wrapper'}>
        <Shuriken>
            <Core />
        </Shuriken>
    </Overlay>
)

export default Loading
