import React, { useState } from 'react'


const UserPanel = () => {

    // const [isChanging, setIsChanging] = useState(false)
    const path = 'https://w7.pngwing.com/pngs/715/372/png-transparent-two-checked-flags-racing-flags-auto-racing-racing-flag-miscellaneous-game-flag-png-free-download.png'
    const nickname = 'Tchigi'

    return (
        <div className="user-panel-wrapper">
            <div className="user-panel-avatar-wrapper">
                <div className="user-panel-avatar" style={{ backgroundImage: `url(${path})` }}></div>
            </div>
            <div className="user-panel-nickname-wrapper">
                <div className={`user-panel-nickname`}>{nickname}</div>
                {/*<input type="text" className={`user-panel-nickname-change-input ${isChanging ?  '' : 'hidden'}`}*/}
                {/*       placeholder={'Enter a new nickname...'} />*/}
                {/*<button className="user-panel-change-nickname-button"*/}
                {/*        title={'Change nickname'}*/}
                {/*        onClick={()=>setIsChanging(!isChanging)}></button>*/}
            </div>
        </div>
    )
};

export default UserPanel
