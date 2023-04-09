import React, { useEffect } from 'react'
import FilterPanelCheckbox from './FilterPanelCheckbox'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { fetchGenresList } from '../../../store/reducers/ActionCreators'

const GenresFilter = () => {

    const dispatch = useAppDispatch()
    const { genres } = useAppSelector(state => state.genresReducer)

    useEffect(() => {
        dispatch(fetchGenresList())
    },[])


    return (
        <div className='genres-filter-wrapper filter__panel__block'>
            <h4 className='genres-filter-title filter__panel__title'>Genres:</h4>
            <div className='genres-filter-checkbox-container filter__panel__checkbox__container'>
                {genres.data.map((item, index)=>(
                    <FilterPanelCheckbox label={item.attributes.name} key={index} genre={item}/>
                ))}
            </div>
        </div>
    )
}

export default GenresFilter
