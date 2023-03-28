import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchAnimeList, fetchSearchAnimeList } from '../../store/reducers/ActionCreators'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import RadioInput from './RadioInput'
import { paginationSlice } from '../../store/reducers/PaginationSlice'

const AnimeListToolbar = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    const { isSearched, sortType } = useAppSelector((state) => state.animeReducer)

    const onChange = (e: any) => {
        setValue(e.target.value)
    }

    const onClickSearch = (e: any) => {
        dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
        dispatch(fetchSearchAnimeList(value))
    }

    const onClickClear = (e: any) => {
        dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
        dispatch(animeSlice.actions.sortAnimeHandler('id'))
        setValue('')
        dispatch(animeSlice.actions.animeClearSearch())
        dispatch(fetchAnimeList())
    }

    return (
        <div className="toolbar-wrapper">
            <div className="search-wrapper">
                <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder={'Search anime...'}
                    className={'animelist-search-input'}
                />
                <button className="small__button blue__button" onClick={onClickSearch}>
                    Search
                </button>
                <button className="small__button red__button" onClick={onClickClear}>
                    Clear
                </button>
            </div>

            <div className={`sort-wrapper ${isSearched ? 'hidden' : ''}`}>
                <p className="sort-title">Sort by:</p>
                <RadioInput />
            </div>
        </div>
    )
}

export default AnimeListToolbar
