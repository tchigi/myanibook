import React, { useEffect, useState } from 'react'
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'
import { useAppDispatch } from '../../../hooks/redux'
import makeAnimated from 'react-select/animated'
import { categoriesSlice } from '../../../store/reducers/CategoriesSlice'
import { genresSlice } from '../../../store/reducers/GenresSlice'
import { OptionsData } from '../../../models/ISelect'
import { paginationSlice } from '../../../store/reducers/PaginationSlice'
import { animeSlice } from '../../../store/reducers/AnimeSlice'
import styled, { keyframes } from 'styled-components'

interface MultiSelectProps {
    selectSortType: string
    isMulti: boolean
    options: OptionsData[]
}

const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`
const CustomSelectStyled = styled.div`
    .custom-select__control {
        width: 100%;
        background: #1c1f22;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }

    .custom-select__control--menu-is-open {
        background-color: #1c1f22;
        box-shadow: 0 0 20px #ff6600;
        color: #ffffff;
    }

    .custom-select__control:hover {
        background-color: #1c1f22;
        box-shadow: 0 0 20px #ffffff;
        color: #ffffff;
    }

    .custom-select__value-container {
        padding: 0;
    }

    .custom-select__value-container--is-multi {
        margin-left: 15px;
        cursor: text;
    }

    .custom-select__input-container {
        color: #ffffff;
    }
    .custom-select__indicator-separator {
        display: none;
    }

    .custom-select__indicators {
        cursor: pointer;
    }

    .custom-select__indicator {
        color: rgba(255, 255, 255, 0.4);
    }
    .custom-select__indicator:hover {
        color: rgba(255, 255, 255, 1);
    }

    .custom-select__multi-value {
        background-color: rgba(255, 102, 0, 0.6);
        border-radius: 5px;
    }
    .custom-select__multi-value__label {
        font-size: 14px;
        color: #ffffff;
    }
    .custom-select__multi-value__remove {
        background-color: transparent;
        cursor: pointer;
    }

    .custom-select__multi-value__remove:hover {
        background-color: rgba(255, 102, 0, 1);
        color: #ffffff;
    }

    .custom-select__menu {
        background-color: #1c1f22;
        border: #b84900 1px solid;
        border-top: none;
        margin-top: 0;
        animation: ${scaleIn} 0.3s;
        z-index: 10;
    }

    .custom-select__option {
        cursor: pointer;
    }
    .custom-select__option--is-focused {
        background-color: #b84900;
    }

    .custom-select__single-value {
        color: #ffffff;
        margin-left: 30px;
        cursor: pointer;
    }

    .custom-select__option--is-selected {
        background-color: #ff6600;
    }
    .custom-select__option--is-selected:hover {
        background-color: #b84900;
    }

    .custom-select__single-value:before {
        background-color: #ff6600;
        border-radius: 50%;
        content: ' ';
        position: absolute;
        left: 15px;
        top: 5px;
        height: 10px;
        width: 10px;
    }

    @media (max-width: 720px) {
        .custom-select__multi-value__label {
            font-size: 10px;
        }
        .custom-select__option {
            height: 25px;
            font-size: 12px;
        }
        .custom-select__menu-list {
            max-height: 250px;
        }
        .custom-select__control--menu-is-open {
            box-shadow: 0 0 10px #ff6600;
        }
        .custom-select__control:hover {
            box-shadow: 0 0 10px #ffffff;
        }
        .custom-select__single-value:before {
            top: 3px;
        }
    }
`

const CustomSelect = ({ selectSortType, isMulti, options }: MultiSelectProps) => {
    const dispatch = useAppDispatch()
    const animatedComponents = makeAnimated()
    const [currentValue, setCurrentValue] = useState<String[] | String>([])

    useEffect(() => {
        if (isMulti) {
            const currentRequest: string = currentValue.length !== 0 ? `&filter[${selectSortType}]=${(currentValue as Array<String>).join(`,`)}` : ''

            dispatch(categoriesSlice.actions.currentCategoriesRequestHandler([selectSortType, currentRequest]))
            dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
        } else {
            dispatch(animeSlice.actions.sortAnimeHandler(currentValue as string))
            dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
        }
    }, [currentValue])

    const getValue = () => {
        if (currentValue) {
            return isMulti ? options.filter((item) => currentValue.indexOf(item.value) >= 0) : options.find((item) => item.value === currentValue)
        } else {
            return isMulti ? [] : ''
        }
    }
    const onChangeHandler = (newValue: MultiValue<string | OptionsData> | SingleValue<string | OptionsData>, actionMeta: ActionMeta<string | OptionsData>) => {
        setCurrentValue(isMulti ? (newValue as OptionsData[]).map((item) => item.value) : (newValue as OptionsData).value)

        window.scrollTo(0, 0)

        if (!isMulti) {
            return
        }

        if (selectSortType === 'genres') {
            dispatch(genresSlice.actions.addToCurrentGenres((newValue as OptionsData[]).map((item) => item.value)))
        } else {
            dispatch(categoriesSlice.actions.addToCurrentCategories((newValue as OptionsData[]).map((item) => item.value)))
        }
    }

    return (
        <CustomSelectStyled onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <Select
                options={options}
                onChange={onChangeHandler}
                value={getValue()}
                isMulti={isMulti}
                classNamePrefix={'custom-select'}
                components={animatedComponents}
                placeholder={!isMulti ? undefined : `Choose ${selectSortType}...`}
                closeMenuOnSelect={!isMulti}
                isSearchable={isMulti}
                defaultValue={!isMulti ? options[0] : undefined}
            />
        </CustomSelectStyled>
    )
}

export default CustomSelect
