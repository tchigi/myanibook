import React from 'react'
import { useAppSelector } from '../hooks/redux'
import Loading from '../components/Loading'
import ViewedList from '../components/userInfoComponents/ViewedList'
import UserPanel from '../components/userInfoComponents/UserPanel'

const UserInfo = () => {
    const { isLoading, error } = useAppSelector((state) => state.animeReducer)

    return (
        <main className={'userinfo-page-wrapper main'}>
            {isLoading && <Loading></Loading>}
            {error && <h1>{error}</h1>}
            <UserPanel />
            <ViewedList />
        </main>
    )
}

export default UserInfo
