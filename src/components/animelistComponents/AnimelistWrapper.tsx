import React, { useEffect, useState } from 'react'
import AnimeCard from './AnimeCard'
import ReactPaginate from 'react-paginate'
import { paginationSlice } from '../../store/reducers/PaginationSlice'
import { fetchAnimeList, fetchPaginateSearchedAnimeList, fetchSearchAnimeList } from '../../store/reducers/ActionCreators'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import AnimeModal from './AnimeModal'

const AnimelistWrapper = () => {
    const dispatch = useAppDispatch()
    const { animeList, isSearched, isLoading, sortType, searchValue } = useAppSelector((state) => state.animeReducer)
    const { animeListCurrentPage, animeListMaxOffset } = useAppSelector((state) => state.paginationReducer)
    const animeListPagesAmount = Math.ceil(animeListMaxOffset / 20) + 1
    const [random, setRandom] = useState(Math.random())

    function pageChangeHandler({ selected }: { selected: number }) {
        if (isSearched) {
            const currentLinkArr = animeList.links.last.split('=')
            const currentOffset = selected * 20
            currentLinkArr[3] = `${currentOffset}`
            const currentLink = currentLinkArr.join('=')
            dispatch(paginationSlice.actions.animeListSetCurrentPage(selected))
            dispatch(fetchPaginateSearchedAnimeList(currentLink))
            return
        }
        dispatch(paginationSlice.actions.animeListSetCurrentPage(selected))
        dispatch(fetchAnimeList(selected * 20, sortType))
    }

    function getAnimeListSize() {
        if (isSearched) {
            dispatch(paginationSlice.actions.animeListSetMaxOffset(Number(animeList.links.last?.split('=')[3])))
            return
        }
        if (animeList.data.length !== 0) {
            dispatch(paginationSlice.actions.animeListSetMaxOffset(Number(animeList.links.last?.split('=')[2].split('&')[0])))
        }
    }

    useEffect(() => {
        getAnimeListSize()
    }, [animeList])

    useEffect(() => {
        if (isSearched !== true) {
            dispatch(fetchAnimeList())
        }
        return
    }, [])

    return (
        <div className="animelist-wrapper" key={random}>
            <AnimeModal />

            {isSearched && animeList.data.length > 0 ? (
                <h2 style={{ width: '100%', textAlign: 'center' }}>
                    Found for your request "{searchValue}"
                </h2>
            ) : (
                ''
            )}

            <div className="anime-cards-container">
                {animeList.data.length === 0 && isSearched ? (
                    <h1>Не найдено аниме...</h1>
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
            </div>

            <ReactPaginate
                className={animeListMaxOffset === 0 || isLoading ? 'hidden' : ''}
                breakLabel="..."
                nextLabel=">"
                onPageChange={pageChangeHandler}
                pageRangeDisplayed={3}
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
        </div>
    )
}

export default AnimelistWrapper
