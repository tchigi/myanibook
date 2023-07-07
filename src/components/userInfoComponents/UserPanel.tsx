import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import UserPanelContainer from './UserPanelContainer'


const UserPanel = () => {
    const { isAuthorized } = useAppSelector(state => state.userReducer)


    return (
        <div className="user-panel-wrapper">
            {isAuthorized ? <UserPanelContainer/> : <h1>User is not found</h1>}
        </div>
    )
};

export default UserPanel
