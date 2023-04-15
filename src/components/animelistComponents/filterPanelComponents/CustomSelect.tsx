import React, { useEffect, useState } from 'react'
import Select, { ActionMeta, MultiValue,  SingleValue } from 'react-select'
import { useAppDispatch } from '../../../hooks/redux'
import makeAnimated from 'react-select/animated';
import { categoriesSlice } from '../../../store/reducers/CategoriesSlice'
import { genresSlice } from '../../../store/reducers/GenresSlice'
import { OptionsData } from '../../../models/ISelect'
import { paginationSlice } from '../../../store/reducers/PaginationSlice'
import { animeSlice } from '../../../store/reducers/AnimeSlice'


interface MultiSelectProps {
    selectSortType: string,
    isMulti: boolean,
    options: OptionsData[]
}

const CustomSelect = ({ selectSortType, isMulti, options }:MultiSelectProps) => {
    const dispatch = useAppDispatch()
    const animatedComponents = makeAnimated();
    const [currentValue, setCurrentValue] = useState<String[] | String>([])

    useEffect(() => {
        if (isMulti) {
            const currentRequest: string = currentValue.length !== 0
                ? `&filter[${selectSortType}]=${(currentValue as Array<String>).join(`&filter[${selectSortType}]=`)}`
                : ''

            if (selectSortType === 'genres') {
                dispatch(genresSlice.actions.currentGenresRequestHandler(currentRequest))
                dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
            } else {
                dispatch(categoriesSlice.actions.currentCategoriesRequestHandler(currentRequest))
                dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
            }
        } else {
            dispatch(animeSlice.actions.sortAnimeHandler(currentValue as string))
        }
    }, [currentValue])


    const getValue = () => {
        if (currentValue) {
            return isMulti
                ? options.filter(item => currentValue.indexOf(item.value) >= 0)
                : options.find(item => item.value === currentValue)
        } else {
            return isMulti ? [] : ''
        }
    }
    const onChangeHandler = (newValue: MultiValue<string | OptionsData> | SingleValue<string | OptionsData>, actionMeta: ActionMeta<string | OptionsData>) => {
        setCurrentValue(
            isMulti ? (newValue as OptionsData[]).map((item) => item.value) :  (newValue as OptionsData).value
        )

        window.scrollTo(0,0)

        if (!isMulti) {
            return
        }

        if (selectSortType === 'genres') {
            dispatch(genresSlice.actions.addToCurrentGenres((newValue as OptionsData[]).map(item => item.value)))
        } else {
            dispatch(categoriesSlice.actions.addToCurrentCategories((newValue as OptionsData[]).map(item => item.value)))
        }
    }

    return (
        <Select
            options={options}
            onChange={onChangeHandler}
            value={getValue()}
            isMulti = {isMulti}
            classNamePrefix={'custom-select'}
            components={animatedComponents}
            placeholder={!isMulti ? undefined : `Choose ${selectSortType}...`}
            closeMenuOnSelect={!isMulti}
            isSearchable={isMulti}
            defaultValue={!isMulti ? options[0] : undefined}
        />

    )
}

export default CustomSelect


