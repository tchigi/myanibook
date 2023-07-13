import React, { useState } from 'react'
import UserPanelNicknameWrapper from './userPanelComponents/UserPanelNicknameWrapper'
import UserPanelChangeNicknameInput from './userPanelComponents/UserPanelChangeNicknameInput'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import axios from 'axios'
import { ApiURL } from '../../constants/url'

const UserPanelContainer = () => {
    const dispatch = useAppDispatch()
    const { isNicknameChanging, userId, avatar } = useAppSelector(state => state.userReducer)
    const [isAvatarChanging, setIsAvatarChanging] = useState(false)

    const onChangeAvatarHandler = (e: any) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('userId',`${userId}`)
        formData.append('image',file)
        axios
            .post(
                `${ApiURL}/users-info/avatar`, formData,
            )
            .then((res) => {
                dispatch(userSlice.actions.userDecodedUserInfoHandler(res.data))
                dispatch(userSlice.actions.userAvatarHandler(res.data.avatar))
            })
            .then(()=> {
                setIsAvatarChanging(false)
                alert('Your avatar has been changed.')
            })
            .catch((e) => {
                console.log(e)
            })
    }


    const onClickAvatarHandler = () => {
        setIsAvatarChanging(!isAvatarChanging)
    }

    return (
        <>
            <div className="user-panel-avatar-wrapper" onClick={onClickAvatarHandler}>
                {avatar ? (
                    <div className={`user-panel-avatar`} title={'Change your avatar'}
                         style={{
                             backgroundImage: `url("${ApiURL}/${avatar}")`
                         }}></div>
                ) : (
                    <div className={`user-panel-avatar`} title={'Change your avatar'}></div>
                )}
            </div>
            <div className={`user-panel-change-avatar-wrapper ${isAvatarChanging ? '' : 'hidden'}`}>
                <input type="file" name="file" id="file" className="inputfile" accept={'image/*'} onChange={onChangeAvatarHandler} />
                <label htmlFor="file">Choose file...</label>
            </div>
            {isNicknameChanging ? <UserPanelChangeNicknameInput /> : <UserPanelNicknameWrapper />}
        </>
    )
}

export default UserPanelContainer
