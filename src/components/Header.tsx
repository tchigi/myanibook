import React, {  useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { paginationSlice } from '../store/reducers/PaginationSlice'
import { animeSlice } from '../store/reducers/AnimeSlice'
import HeaderAuthButtons from './authComponents/HeaderAuthButtons'
import HeaderUserAvatar from './authComponents/HeaderUserAvatar'


function Header() {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    let navigate = useNavigate()
    const { isAuthorized } = useAppSelector(state => state.userReducer)

    const setActive = ({ isActive, isPending }:any) =>
        isPending ? "pending-link" : isActive ? "active-link" : ""

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
        <header className={'header'}>
            <div className="nav-container">
                <NavLink to="/">
                    <div className="title-logo"></div>
                </NavLink>
                <nav className="nav">
                    <NavLink to="/" end className={setActive}>
                        Home
                    </NavLink>
                    <NavLink to="/anime" className={setActive}>
                        Anime
                    </NavLink>
                    <NavLink to="/user" className={setActive}>
                        {' '}
                        AnimeList
                    </NavLink>
                </nav>
            </div>
            <div className="search-wrapper">
                <input value={value} onChange={onChange} onKeyDown={onKeyPressEnter} type="text" placeholder={'Search anime...'} className={'animelist-search-input'} />
                <Link to={'/anime'}>
                    <button className="small__button blue__button" onClick={onClickSearch}>
                        Search
                    </button>
                </Link>
                <button className="small__button red__button" onClick={onClickClear}>
                    Clear
                </button>
            </div>

            <div className="header-auth-container">
                {isAuthorized ? <HeaderUserAvatar/> : <HeaderAuthButtons/>}
            </div>
        </header>
    )
}

export default Header
