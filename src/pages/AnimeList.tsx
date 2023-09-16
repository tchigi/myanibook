import React from 'react'
import { useAppSelector } from '../hooks/redux'
import AnimelistWrapper from '../components/animelistComponents/AnimelistWrapper'
import FilterPanel from '../components/animelistComponents/FilterPanel'
import Loading from '../components/Loading'
import styled from 'styled-components'

const AnimelistPageWrapperStyled = styled.main`
    position: relative;
    background-color: #1c1f22;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;

    @media (max-width: 720px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`

const AnimelistAnimeBlockStyled = styled.div`
    position: relative;
    width: 80%;
    border-radius: 20px;
    padding: 15px;
    background-color: #2e3338;

    @media (max-width: 720px) {
        width: 100%;
        border-radius: 10px;
        padding: 5px;
    }
`
const AnimeList = () => {
    const { isLoading, error } = useAppSelector((state) => state.animeReducer)

    return (
        <AnimelistPageWrapperStyled>
            <FilterPanel />
            <AnimelistAnimeBlockStyled>
                {isLoading && <Loading></Loading>}
                {error && <h1>{error}</h1>}
                <AnimelistWrapper />
            </AnimelistAnimeBlockStyled>
        </AnimelistPageWrapperStyled>
    )
}

export default AnimeList
