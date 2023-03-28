import React from 'react'
import { useAppSelector } from '../hooks/redux'
import AnimeListToolbar from '../components/animelistComponents/AnimeListToolbar'
import AnimelistWrapper from '../components/animelistComponents/AnimelistWrapper'
import UserInfoBlock from '../components/animelistComponents/UserInfoBlock'
import Loading from '../components/Loading'

const AnimeList = () => {
    const { isLoading, error } = useAppSelector((state) => state.animeReducer)

    return (
        <main className={'animelist-page-wrapper main'}>
            <UserInfoBlock />
            <div className={'animelist-anime-block'}>
                <AnimeListToolbar />
                {isLoading && <Loading></Loading>}
                {error && <h1>{error}</h1>}
                <AnimelistWrapper />
            </div>
        </main>
    )
}

export default AnimeList
