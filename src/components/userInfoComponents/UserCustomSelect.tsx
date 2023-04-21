import { OptionsData } from '../../models/ISelect'
import { useAppDispatch } from '../../hooks/redux'
import makeAnimated from 'react-select/animated'
import React, { useEffect, useState } from 'react'
import { genresSlice } from '../../store/reducers/GenresSlice'
import { paginationSlice } from '../../store/reducers/PaginationSlice'
import { categoriesSlice } from '../../store/reducers/CategoriesSlice'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import Select, { ActionMeta, SingleValue } from 'react-select'
import { userSlice } from '../../store/reducers/UserSlice'


const UserCustomSelect = () => {
    const dispatch = useAppDispatch()
    const animatedComponents = makeAnimated();
    const [currentValue, setCurrentValue] = useState<String[] | String>([])

    const animeSortOptions = [
        { value: `sortByDate`, label: `Sort by date of addition` },
        { value: `sortByNameAZ`, label: `Sort by name(A-Z)` },
        { value: `sortByNameZA`, label: `Sort by name(Z-A)` },
    ]

    const getValue = () => {
        if (currentValue) {
            return animeSortOptions.find(item => item.value === currentValue)
        } else {
            return ''
        }
    }
    const onChangeHandler = (newValue: SingleValue<string | OptionsData>, actionMeta: ActionMeta<string | OptionsData>) => {
        setCurrentValue(
            (newValue as OptionsData).value
        )

        dispatch(userSlice.actions.userInfoAnimeSortHandler((newValue as OptionsData).value))

        window.scrollTo(0,0)
    }

    return (
        <Select
            options={animeSortOptions}
            onChange={onChangeHandler}
            value={getValue()}
            isMulti = {false}
            classNamePrefix={'custom-select'}
            components={animatedComponents}
            closeMenuOnSelect={true}
            isSearchable={false}
            defaultValue={animeSortOptions[0]}
        />

    )
}

export default UserCustomSelect
