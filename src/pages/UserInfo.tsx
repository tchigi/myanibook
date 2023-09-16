import React from 'react'
import { useAppSelector } from '../hooks/redux'
import Loading from '../components/Loading'
import ViewedList from '../components/userInfoComponents/ViewedList'
import UserPanel from '../components/userInfoComponents/UserPanel'
import styled from 'styled-components'

const UserinfoPageWrapperStyled = styled.main`
    background-color: #1c1f22;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;

    @media (max-width: 720px) {
        flex-direction: column;
        gap: 10px;
    }
`
const UserInfo = () => {
    const { isLoading, error } = useAppSelector((state) => state.animeReducer)

    return (
        <UserinfoPageWrapperStyled>
            {isLoading && <Loading></Loading>}
            <UserPanel />
            <ViewedList />
        </UserinfoPageWrapperStyled>
    )
}

export default UserInfo
