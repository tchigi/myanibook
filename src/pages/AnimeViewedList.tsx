import React from 'react'
import { useAppSelector } from '../hooks/redux'
import FilterPanel from '../components/animelistComponents/FilterPanel'
import Loading from '../components/Loading'
import ViewedList from '../components/ViewedList'

const AnimeViewedList = () => {
    const { isLoading, error } = useAppSelector((state) => state.animeReducer)

    return (
        <main className={'animelist-page-wrapper main'}>
            <FilterPanel />
            {isLoading && <Loading></Loading>}
            {error && <h1>{error}</h1>}
            <ViewedList />
        </main>
    )
}

export default AnimeViewedList
