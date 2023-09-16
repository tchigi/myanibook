import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import UserPanelContainer from './UserPanelContainer'
import styled from 'styled-components'

const UserPanelWrapperStyled = styled.div`
  position: relative;
  width: 20%;
  background-color: #2e3338;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 720px) {
    width: 100%;
    border-radius: 10px;
    
    & h1 {
      font-size: 18px;
    }
  }
`

const UserPanel = () => {
    const { isAuthorized } = useAppSelector(state => state.userReducer)

    return (
        <UserPanelWrapperStyled>
            {isAuthorized ? <UserPanelContainer/> : <h1>User is not found</h1>}
        </UserPanelWrapperStyled>
    )
};

export default UserPanel
