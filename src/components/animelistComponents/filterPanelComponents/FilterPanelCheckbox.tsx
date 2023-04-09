import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { genresSlice } from '../../../store/reducers/GenresSlice'
import { GenreData } from '../../../models/IGenre'

type CheckboxProps = {
    label: string
    genre: GenreData
}

const FilterPanelCheckbox = ({ label,  genre }:CheckboxProps) => {
    const dispatch = useAppDispatch()
    const { currentGenres } = useAppSelector(state => state.genresReducer)

    const [isChecked, setIsChecked] = useState(false);


    const currentGenresHandler = () => {
        if (isChecked) {
            dispatch(genresSlice.actions.removeFromCurrentGenres(genre))
        } else {
            dispatch(genresSlice.actions.addToCurrentGenres(genre))
        }
    }

    const onChangeHandler = () => {
        currentGenresHandler()

        setIsChecked((prev) => !prev)
    }

    useEffect(() => {
        const currentRequest = currentGenres.length !== 0
        ? '&filter[genres]=' + currentGenres.map(item=>item.attributes.name).join('&filter[genres]=')
        : ''

        dispatch(genresSlice.actions.currentGenresRequestHandler(currentRequest))

        setIsChecked(currentGenres.filter(item => item.id === genre.id).length !== 0)
    }, [currentGenres])

    return (
        <div className={`filter__panel__checkbox__wrapper ${isChecked ? 'checked' : ''}`}>
            <label>
                <input type="checkbox" checked={isChecked} onChange={onChangeHandler}
                       className={`filter__panel__checkbox ${isChecked ? 'checked' : ''}`} />
                <span className="filter__panel__checkbox__label">{label}</span>
            </label>
        </div>
    )
}

export default FilterPanelCheckbox
