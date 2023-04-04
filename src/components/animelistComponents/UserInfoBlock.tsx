import React from 'react'
import { NavLink } from 'react-router-dom'
import RadioInput from './RadioInput'
import { useAppSelector } from '../../hooks/redux'

const UserInfoBlock = () => {
    const { isSearched, sortType } = useAppSelector((state) => state.animeReducer)

    return (
        <div className={'userblock__wrapper'}>
            <div className='userblock-info'>
                <figure className="userblock-avatar-wrapper">
                        <div className="userblock-avatar"></div>
                </figure>
                <div className='userblock-name-wrapper'>
                    Anonymous
                </div>
            </div>
            <div className='userblock-pageinfo'>
                <NavLink to={'/anime'} end>
                    <div className={'userblock__button'}>Anime</div>
                </NavLink>
                <NavLink to={'/anime/viewed'}>
                    <div className={'userblock__button'}>Viewed</div>
                </NavLink>
            </div>

            <div className={`sort-wrapper ${isSearched ? 'hidden' : ''}`}>
                <p className="sort-title">Sort by:</p>
                <RadioInput />
            </div>
        </div>
    )
}

export default UserInfoBlock
