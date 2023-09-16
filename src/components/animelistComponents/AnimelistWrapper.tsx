import React, { useEffect, useState } from 'react'
import AnimeCard from './AnimeCard'
import ReactPaginate from 'react-paginate'
import { paginationSlice } from '../../store/reducers/PaginationSlice'
import { fetchAnimeList } from '../../store/reducers/ActionCreators'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import AnimeModal from './AnimeModal'
import styled from 'styled-components'
import './Pagination.css'

const AnimelistWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;

    & h2 {
        font-size: 24px;
    }

    @media (max-width: 720px) {
        & h2 {
            font-size: 18px;
        }
    }
`

const AnimeCardsContainerStyled = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;

    @media (max-width: 720px) {
        gap: 5px;
    }
`

const AnimelistWrapper = () => {
    const dispatch = useAppDispatch()
    const { animeList, isSearched, isLoading, sortType, searchValue } = useAppSelector((state) => state.animeReducer)
    const { animeListCurrentPage, animeListMaxOffset } = useAppSelector((state) => state.paginationReducer)
    const { currentGenresRequest } = useAppSelector((state) => state.genresReducer)
    const { currentCategoriesRequest } = useAppSelector((state) => state.categoriesReducer)
    const animeListPagesAmount = Math.ceil(animeListMaxOffset / 20) + 1

    function pageChangeHandler({ selected }: { selected: number }) {
        window.scrollTo(0, 0)
        dispatch(paginationSlice.actions.animeListSetCurrentPage(selected))
    }

    function getAnimeListSize() {
        const arr = animeList.links.last?.split('&')
        const offset = arr
            .filter((i) => i.match('offset'))
            .join('')
            .split('=')[1]

        if (animeList.data.length !== 0) {
            dispatch(paginationSlice.actions.animeListSetMaxOffset(Number(offset)))
        }
    }

    useEffect(() => {
        getAnimeListSize()
    }, [animeList])

    useEffect(() => {
        dispatch(fetchAnimeList(sortType, currentGenresRequest, currentCategoriesRequest, isSearched, searchValue, animeListCurrentPage))
    }, [sortType, isSearched, currentGenresRequest, animeListCurrentPage, currentCategoriesRequest])

    return (
        <AnimelistWrapperStyled>
            <AnimeModal />

            {isSearched && animeList.data.length > 0 ? <h2>Found for your request "{searchValue}"</h2> : ''}

            <AnimeCardsContainerStyled>
                {animeList.data.length === 0 && isSearched ? (
                    <h1>No anime found...</h1>
                ) : (
                    animeList.data.map((item) => (
                        <AnimeCard
                            image={item.attributes.posterImage.original}
                            title={item.attributes.canonicalTitle}
                            showType={item.attributes.showType}
                            key={item.id}
                            id={item.id}
                            anime={item}
                            rating={item.attributes.averageRating}
                        />
                    ))
                )}
            </AnimeCardsContainerStyled>

            <ReactPaginate
                className={animeListMaxOffset === 0 || isLoading || animeList.data.length === 0 ? 'hidden' : ''}
                breakLabel="..."
                nextLabel=">"
                onPageChange={pageChangeHandler}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={animeListPagesAmount}
                previousLabel="<"
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active-pagination'}
                forcePage={animeListCurrentPage}
            />
        </AnimelistWrapperStyled>
    )
}

export default AnimelistWrapper
