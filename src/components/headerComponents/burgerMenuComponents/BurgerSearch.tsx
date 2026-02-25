import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { animeSlice } from '../../../store/reducers/AnimeSlice'
import { paginationSlice } from '../../../store/reducers/PaginationSlice'
import { useAppDispatch } from '../../../hooks/redux'
import styled from 'styled-components'

const BurgerSearchStyled = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    width: 100%;
    height: 25px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
    overflow: hidden;
    transition: box-shadow 0.3s;

    &:focus-within,
    &:hover {
        box-shadow: 0 0 12px rgba(255, 102, 0, 0.5), 0 0 0 1px #ff6600;
    }
`
const BurgerSearchInputStyled = styled.input`
    flex: 1;
    height: 100%;
    padding-left: 12px;
    font-size: 16px;
    color: #e8e8e8;
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
        color: #888888;
    }
`
const BurgerSearchButtonStyled = styled.button`
    flex-shrink: 0;
    height: 100%;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    transition: 0.3s;
    stroke: #c8c8c8;

    & svg {
        transition: 0.3s;
    }

    &:hover {
        background-color: #ff6600;
        stroke: #ffffff;
    }

    & a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
`
const BurgerDivider = styled.span`
    flex-shrink: 0;
    width: 1px;
    height: 14px;
    background: rgba(255, 255, 255, 0.2);
`
const BurgerClearButtonStyled = styled.button`
    flex-shrink: 0;
    height: 24px;
    width: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    transition: 0.3s;
    stroke: #c8c8c8;

    & svg {
        transition: 0.3s;
    }

    &:hover {
        background-color: #ff6600;
        stroke: #ffffff;
    }
`

type BurgerSearchProps = {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const BurgerSearch = ({ setIsActive }: BurgerSearchProps) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    let navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onClickSearch = () => {
        dispatch(animeSlice.actions.animeSearch(value))
        dispatch(paginationSlice.actions.animeListSetCurrentPage(0))

        setIsActive((prev) => !prev)
        navigate('/anime')
    }

    const onClickClear = () => {
        dispatch(paginationSlice.actions.animeListSetCurrentPage(0))
        setValue('')
        dispatch(animeSlice.actions.animeClearSearch())
    }

    const onKeyPressEnter = (e: any) => {
        if (e.key === 'Enter') {
            onClickSearch()
        }
    }

    return (
        <BurgerSearchStyled className="search-wrapper" onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
            <BurgerSearchInputStyled value={value} onChange={onChange} onKeyDown={onKeyPressEnter} type="text" placeholder={'Search anime...'} className={'search-input'} />
            {value && (
                <BurgerClearButtonStyled onClick={onClickClear}>
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="2.64645" y1="17.6464" x2="17.6464" y2="2.64645" />
                        <line x1="2.35355" y1="2.64645" x2="17.3536" y2="17.6464" />
                    </svg>
                </BurgerClearButtonStyled>
            )}
            <BurgerDivider />
            <BurgerSearchButtonStyled onClick={onClickSearch}>
                <Link to={'/anime'}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="8" r="6" />
                        <line x1="11.3254" y1="11.6204" x2="18.3254" y2="17.6204" />
                    </svg>
                </Link>
            </BurgerSearchButtonStyled>
        </BurgerSearchStyled>
    )
}

export default BurgerSearch
