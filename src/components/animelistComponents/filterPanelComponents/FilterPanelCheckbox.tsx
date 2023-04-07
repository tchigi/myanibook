import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { genresSlice } from '../../../store/reducers/GenresSlice'
import { GenreData } from '../../../models/IGenre'
import { animeSlice } from '../../../store/reducers/AnimeSlice'
import { fetchSortedByGenresSearchedAnimeList } from '../../../store/reducers/ActionCreators'

type CheckboxProps = {
    label: string
    checked: boolean
    genre: GenreData
}

const FilterPanelCheckbox = ({ label, checked, genre }:CheckboxProps) => {
    const dispatch = useAppDispatch()
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);
    const { isSearched, searchValue } = useAppSelector(state => state.animeReducer)
    const { currentGenres } = useAppSelector(state => state.genresReducer)

    const genresLink = currentGenres.length !=0 ? currentGenres.map(item=>item.attributes.name).join('&filter[genres]=') : ''

    const currentGenresHandler = () => {
        if (isChecked) {
            dispatch(genresSlice.actions.removeFromCurrentGenres(genre))
        } else {
            dispatch(genresSlice.actions.addToCurrentGenres(genre))
        }
    }

    const onChangeHandler = () => {
        currentGenresHandler()

        if (isSearched) {
            dispatch(fetchSortedByGenresSearchedAnimeList(searchValue, genresLink))
        } else {
        }

        setIsChecked((prev) => !prev)
    }

    return (
        <div className={`filter__panel__checkbox__wrapper ${isChecked ? 'checked' : ''}`}>
            <label>
                <input type="checkbox" checked={isChecked} onChange={onChangeHandler} className={`filter__panel__checkbox ${isChecked ? 'checked' : ''}`} />
                <span className="filter__panel__checkbox__label">{label}</span>
            </label>
        </div>
    )
}

export default FilterPanelCheckbox
