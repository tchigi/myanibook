import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import { paginationSlice } from '../../store/reducers/PaginationSlice'
import { useAppDispatch } from '../../hooks/redux'
import styled from 'styled-components'

const SearchStyled = styled.div`
    margin-left: auto;
    margin-right: auto;
    position: relative;

    @media (max-width: 720px) {
        display: none;
    }
`
const SearchInput = styled.input`
    width: 350px;
    border-radius: 30px;
    padding-left: 35px;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    transition: 0.3s;
    color: #1c1f22;

    &:focus,
    &:hover {
        box-shadow: 0 0 20px #ff6600;
    }

    &::placeholder {
        color: #cccccc;
    }

    @media (max-width: 720px) {
        display: none;
    }
`
const SearchButton = styled.button`
    height: 30px;
    width: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: inherit;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    transition: 0.3s;
    stroke: #1c1f22;

    & svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover {
        background-color: #b84900;
    }

    & a {
        display: block;
        width: 100%;
        height: 100%;
    }

    @media (max-width: 720px) {
        height: 20px;
        width: 20px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
        stroke: #d9d9d9;
    }
`
const ClearButton = styled.button`
    padding-right: 5px;
    height: 30px;
    width: 30px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: inherit;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    transition: 0.3s;
    stroke: #1c1f22;

    & svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover {
        background-color: #b84900;
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

            <SearchButton onClick={onClickSearch}>
                <Link to={'/anime'}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="8" r="6" />
                        <line x1="11.3254" y1="11.6204" x2="18.3254" y2="17.6204" />
                    </svg>
                </Link>
            </SearchButton>

            <ClearButton onClick={onClickClear}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2.64645" y1="17.6464" x2="17.6464" y2="2.64645" />
                    <line x1="2.35355" y1="2.64645" x2="17.3536" y2="17.6464" />
                </svg>
            </ClearButton>
        </SearchStyled>
    )
}

export default Search
