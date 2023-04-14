import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import RadioInput from './filterPanelComponents/RadioInput'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import MultiSelect from './filterPanelComponents/MultiSelect'
import { fetchCategoriesList, fetchGenresList } from '../../store/reducers/ActionCreators'

const FilterPanel = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchGenresList())
        dispatch(fetchCategoriesList())
    }, [])

    return (
        <div className={'filter-panel-wrapper'}>
            <div className={`sort-wrapper filter__panel__block`}>
                <h4 className="sort-title filter__panel__title">Sort by:</h4>
                <RadioInput />
            </div>
            <div className={`select__wrapper`}>
                <h4 className="select__title filter__panel__title">Select genres:</h4>
                <div className='select__container'>
                    <MultiSelect selectSortType={'genres'}/>
                </div>
            </div>
            <div className={`select__wrapper`}>
                <h4 className="select__title filter__panel__title">Select categories:</h4>
                <div className='select__container'>
                    <MultiSelect selectSortType={'categories'}/>
                </div>
            </div>

        </div>
    )
}

export default FilterPanel
