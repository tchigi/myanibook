import React from 'react'
import { useAppSelector } from '../hooks/redux'
import AnimelistWrapper from '../components/animelistComponents/AnimelistWrapper'
import FilterPanel from '../components/animelistComponents/FilterPanel'
import Loading from '../components/Loading'

const AnimeList = () => {
    const { isLoading, error } = useAppSelector((state) => state.animeReducer)

    return (
        <main className={'animelist-page-wrapper main'}>
            <FilterPanel />
            <div className={'animelist-anime-block'}>
                {isLoading && <Loading></Loading>}
                {error && <h1>{error}</h1>}
                <AnimelistWrapper />
            </div>
        </main>
    )
}

export default AnimeList
