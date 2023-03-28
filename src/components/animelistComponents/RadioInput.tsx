import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import { paginationSlice } from '../../store/reducers/PaginationSlice'
import { fetchAnimeList } from '../../store/reducers/ActionCreators'

const RadioInput = () => {
    const { sortType, animeList } = useAppSelector((state) => state.animeReducer)
    const { animeListCurrentPage } = useAppSelector((state) => state.paginationReducer)
    const dispatch = useAppDispatch()
    const sortTypeArr = ['id', 'ratingRank', 'popularityRank']
    const inputValueArr = ['Default', 'Rating', 'Popularity']



    function onChangeHandler(e: any) {
        dispatch(animeSlice.actions.sortAnimeHandler(e.target.value))
        dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
    }

    function isActive(i: string) {
        return sortType == i ? 'active' : ''
    }

    return (
        <div className={'radio-input-wrapper'}>
            {sortTypeArr.map((item, index) => (
                <div key={index} className={`radio__button__wrapper ${isActive(item)}`}>
                    <label className="radio__button__label">
                        <input
                            className="radio__button"
                            type="radio"
                            value={item}
                            checked={sortType == item}
                            onChange={onChangeHandler}
                        />
                        {inputValueArr[index]}
                    </label>
                </div>
            ))}
        </div>
    )
}

export default RadioInput
