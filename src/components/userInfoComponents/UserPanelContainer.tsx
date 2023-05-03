import React from 'react'

const UserPanelContainer = () => {
    const path = 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbXxlbnwwfHwwfHw%3D&w=1000&q=80'
    const nickname = 'Tchigi'

    return (
        <>
            <div className="user-panel-avatar-wrapper">
                <div className="user-panel-avatar" style={{ backgroundImage: `url(${path})` }}></div>
            </div>
            <div className="user-panel-nickname-wrapper">
                <div className={`user-panel-nickname`}>{nickname}</div>
            </div>
        </>
    )
}

export default UserPanelContainer
