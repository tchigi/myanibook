import React, { useEffect, useState } from 'react'
import Select, { ActionMeta} from 'react-select'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import makeAnimated from 'react-select/animated';
import { categoriesSlice } from '../../../store/reducers/CategoriesSlice'
import { genresSlice } from '../../../store/reducers/GenresSlice'
import { fetchCategoriesList, fetchGenresList } from '../../../store/reducers/ActionCreators'

interface OptionsData {
    value: string,
    label: string
}

interface MultiSelectProps {
    selectSortType: string,
}

const MultiSelect = ({ selectSortType }:MultiSelectProps) => {
    const dispatch = useAppDispatch()
    const { genres, currentGenres } = useAppSelector((state) => state.genresReducer)
    const { categories, currentCategories } = useAppSelector((state) => state.categoriesReducer)
    const genresOptions: OptionsData[] = []
    const categoriesOptions: OptionsData[] = []
    const animatedComponents = makeAnimated();
    const [currentValue, setCurrentValue] = useState([])

    const createGenresOptions = () => {
        genres.data.map(item => {
            return genresOptions.push({ value: `${item.attributes.name}`, label: `${item.attributes.name}` })
        })
    }
    const createCategoriesOptions = () => {
        categories.data.forEach(item => {
            return categoriesOptions.push({ value: `${item.attributes.title}`, label: `${item.attributes.title}` })
        })
    }

    // useEffect(() => {
    //     const currentRequest = currentCategories.length !== 0
    //         ? '&filter[categories]=' + currentCategories.map(item=>item.attributes.title).join('&filter[categories]=')
    //         : ''
    //
    //     dispatch(categoriesSlice.actions.currentCategoriesRequestHandler(currentRequest))
    //
    // }, [currentCategories])
    //
    // useEffect(() => {
    //     const currentRequest = currentGenres.length !== 0
    //         ? '&filter[genres]=' + currentGenres.map(item=>item.attributes.name).join('&filter[genres]=')
    //         : ''
    //
    //     dispatch(genresSlice.actions.currentGenresRequestHandler(currentRequest))
    // }, [currentGenres])

    const onChangeHandler = (selectedOption: readonly OptionsData[], actionMeta: ActionMeta<OptionsData>) => {
        if (selectSortType === 'genres') {
            dispatch(genresSlice.actions.addToCurrentGenres(selectedOption.map(item => item.value)))
        } else {
            dispatch(categoriesSlice.actions.addToCurrentCategories(selectedOption.map(item => item.value)))
        }
        setCurrentValue(prevState => [...prevState, selectedOption])
    }

    const getValue = () => {
        if (currentValue) {

        } else {

        }
    }

    return (
        <Select
            options={selectSortType === 'genres' ? genresOptions : categoriesOptions}
            onChange={onChangeHandler}
            value={getValue()}
            isMulti
            classNamePrefix={'custom-select'}
            components={animatedComponents}
            placeholder={`Choose ${selectSortType}...`}
        />

    )
}

export default MultiSelect


