import React from 'react'
import { useAppSelector } from '../hooks/redux'
import UserInfoBlock from '../components/animelistComponents/UserInfoBlock'
import Loading from '../components/Loading'
import ViewedList from '../components/ViewedList'

const AnimeViewedList = () => {
    const { isLoading, error } = useAppSelector((state) => state.animeReducer)

    return (
        <main className={'animelist-page-wrapper main'}>
            <UserInfoBlock />
            {isLoading && <Loading></Loading>}
            {error && <h1>{error}</h1>}
            <ViewedList />
        </main>
    )
}

export default AnimeViewedList
