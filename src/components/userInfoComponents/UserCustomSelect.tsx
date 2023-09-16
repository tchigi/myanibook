import { OptionsData } from '../../models/ISelect'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import makeAnimated from 'react-select/animated'
import React, { useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import { userSlice } from '../../store/reducers/UserSlice'
import styled, { keyframes } from 'styled-components'

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
const UserCustomSelect = () => {
    const dispatch = useAppDispatch()
    const animatedComponents = makeAnimated()
    const { viewedAnimeSortType } = useAppSelector((state) => state.userReducer)
    const [currentValue, setCurrentValue] = useState<String>(viewedAnimeSortType)

    const animeSortOptions = [
        { value: `sortByDateFirstOld`, label: `Sort by date of addition (first old)` },
        { value: `sortByDateFirstNew`, label: `Sort by date of addition (first new)` },
        { value: `sortByNameAZ`, label: `Sort by name (A-Z)` },
        { value: `sortByNameZA`, label: `Sort by name (Z-A)` },
    ]

    const getValue = () => {
        if (currentValue) {
            return animeSortOptions.find((item) => item.value === currentValue)
        } else {
            return ''
        }
    }
    const onChangeHandler = (newValue: SingleValue<string | OptionsData>, actionMeta: ActionMeta<string | OptionsData>) => {
        setCurrentValue((newValue as OptionsData).value)

        dispatch(userSlice.actions.userInfoAnimeSortHandler((newValue as OptionsData).value))
    }

    return (
        <CustomSelectStyled>
            <Select
                options={animeSortOptions}
                onChange={onChangeHandler}
                value={getValue()}
                isMulti={false}
                classNamePrefix={'custom-select'}
                components={animatedComponents}
                closeMenuOnSelect={true}
                isSearchable={false}
                defaultValue={viewedAnimeSortType}
            />
        </CustomSelectStyled>
    )
}

export default UserCustomSelect
