import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { animeSlice } from '../../../store/reducers/AnimeSlice'
import { paginationSlice } from '../../../store/reducers/PaginationSlice'
import { useAppDispatch } from '../../../hooks/redux'
import styled from 'styled-components'

const BurgerSearchStyled = styled.div`
    margin-left: auto;
    margin-right: auto;
    position: relative;
`
const BurgerSearchInputStyled = styled.input`
    width: 250px;
    border-radius: 25px;
    padding-left: 30px;
    height: 25px;
    font-size: 16px;
    line-height: 25px;
    transition: 0.3s;
    color: #1c1f22;

    &:focus,
    &:hover {
        box-shadow: 0 0 10px #ff6600;
    }

    &::placeholder {
        color: #cccccc;
    }
`
const BurgerSearchButtonStyled = styled.button`
    height: 25px;
    width: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    background-color: inherit;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
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
`
const BurgerClearButtonStyled = styled.button`
    padding-right: 5px;
    height: 25px;
    width: 30px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: inherit;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
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
        setIsActive((prev) => !prev)
    }

    const onKeyPressEnter = (e: any) => {
        if (e.key === 'Enter') {
            onClickSearch()
        }
    }

    return (
        <BurgerSearchStyled className="search-wrapper" onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
            <BurgerSearchInputStyled value={value} onChange={onChange} onKeyDown={onKeyPressEnter} type="text" placeholder={'Search anime...'} className={'search-input'} />
            <BurgerSearchButtonStyled onClick={onClickSearch}>
                <Link to={'/anime'}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7" cy="8" r="6" />
                        <line x1="11.3254" y1="11.6204" x2="18.3254" y2="17.6204" />
                    </svg>
                </Link>
            </BurgerSearchButtonStyled>
            <BurgerClearButtonStyled onClick={onClickClear}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="2.64645" y1="17.6464" x2="17.6464" y2="2.64645" />
                    <line x1="2.35355" y1="2.64645" x2="17.3536" y2="17.6464" />
                </svg>
            </BurgerClearButtonStyled>
        </BurgerSearchStyled>
    )
}

export default BurgerSearch
