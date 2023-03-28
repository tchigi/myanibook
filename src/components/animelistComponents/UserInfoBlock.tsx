import React from 'react'
import { NavLink } from 'react-router-dom'

const UserInfoBlock = () => {
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
                {/*<NavLink to={'/anime'}>*/}
                    <button className={'userblock__button active'}>Anime List</button>
                {/*</NavLink>*/}
                {/*<NavLink to={'/anime'}>*/}
                    <button className={'userblock__button'}>Viewed Anime</button>
                {/*</NavLink>*/}
            </div>
        </div>
    )
}

export default UserInfoBlock
