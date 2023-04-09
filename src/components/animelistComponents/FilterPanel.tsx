import React from 'react'
import { NavLink } from 'react-router-dom'
import RadioInput from './RadioInput'
import { useAppSelector } from '../../hooks/redux'
import GenresFilter from './filterPanelComponents/genresFilters'
import CategoriesFilter from './filterPanelComponents/categoriesFilter'

const FilterPanel = () => {
    return (
        <div className={'filter-panel-wrapper'}>
            <div className='filter-panel-pageinfo filter__panel__block'>
                <NavLink to={'/anime'} end>
                    <div className={'filter-panel__button'}>Anime</div>
                </NavLink>
                <NavLink to={'/anime/viewed'}>
                    <div className={'filter-panel__button'}>Viewed</div>
                </NavLink>
            </div>

            <div className={`sort-wrapper filter__panel__block`}>
                <h4 className="sort-title filter__panel__title">Recommended:</h4>
                <RadioInput />
            </div>
            <GenresFilter/>
            <CategoriesFilter/>
        </div>
    )
}

export default FilterPanel
