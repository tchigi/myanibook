import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import { paginationSlice } from '../../store/reducers/PaginationSlice'
import { useAppDispatch } from '../../hooks/redux'
import styled from 'styled-components'

const SearchStyled = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    width: 350px;
    height: 30px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
    overflow: hidden;
    transition: box-shadow 0.3s;

    &:focus-within,
    &:hover {
        box-shadow: 0 0 16px rgba(255, 102, 0, 0.5), 0 0 0 1px #ff6600;
    }

    @media (max-width: 720px) {
        display: none;
    }
`
const SearchInput = styled.input`
    flex: 1;
    height: 100%;
    padding-left: 14px;
    font-size: 18px;
    color: #e8e8e8;
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
        color: #888888;
    }
`
const SearchButton = styled.button`
    flex-shrink: 0;
    height: 100%;
    width: 34px;
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
const Divider = styled.span`
    flex-shrink: 0;
    width: 1px;
    height: 16px;
    background: rgba(255, 255, 255, 0.2);
`
const ClearButton = styled.button`
    flex-shrink: 0;
    height: 28px;
    width: 28px;
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

const Search = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    let navigate = useNavigate()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onClickSearch = () => {
        dispatch(animeSlice.actions.animeSearch(value))
        dispatch(paginationSlice.actions.animeListSetCurrentPage(0))

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
        <SearchStyled>
            <SearchInput value={value} onChange={onChange} onKeyDown={onKeyPressEnter} type="text" placeholder={'Search anime...'} />
            {value && (
                <ClearButton onClick={onClickClear}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="2.64645" y1="17.6464" x2="17.6464" y2="2.64645" />
                        <line x1="2.35355" y1="2.64645" x2="17.3536" y2="17.6464" />
                    </svg>
                </ClearButton>
            )}
            <Divider />
            <SearchButton onClick={onClickSearch}>
                <Link to={'/anime'}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="8" r="6" />
                        <line x1="11.3254" y1="11.6204" x2="18.3254" y2="17.6204" />
                    </svg>
                </Link>
            </SearchButton>
        </SearchStyled>
    )
}

export default Search
