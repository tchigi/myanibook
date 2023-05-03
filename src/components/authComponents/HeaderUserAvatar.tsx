import React from 'react'

const HeaderUserAvatar = () => {
    const path = 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&w=1000&q=80'


    return (
        <div className="header-user-avatar-wrapper" title={'Log Out'}>
            <div className="header-user-avatar" style={{ backgroundImage: `url(${path})` }}></div>
        </div>
    )
}

export default HeaderUserAvatar
