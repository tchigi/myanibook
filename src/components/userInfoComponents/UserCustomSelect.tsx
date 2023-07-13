import { OptionsData } from '../../models/ISelect'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import makeAnimated from 'react-select/animated'
import React, { useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import { userSlice } from '../../store/reducers/UserSlice'


const UserCustomSelect = () => {
    const dispatch = useAppDispatch()
    const animatedComponents = makeAnimated();
    const { viewedAnimeSortType } = useAppSelector(state => state.userReducer)
    const [currentValue, setCurrentValue] = useState<String>(viewedAnimeSortType)


    const animeSortOptions = [
        { value: `sortByDateFirstOld`, label: `Sort by date of addition (first old)` },
        { value: `sortByDateFirstNew`, label: `Sort by date of addition (first new)` },
        { value: `sortByNameAZ`, label: `Sort by name (A-Z)` },
        { value: `sortByNameZA`, label: `Sort by name (Z-A)` },
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
            defaultValue={viewedAnimeSortType}
        />

    )
}

export default UserCustomSelect
