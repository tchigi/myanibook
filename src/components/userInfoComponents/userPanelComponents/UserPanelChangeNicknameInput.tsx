import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { userSlice } from '../../../store/reducers/UserSlice'

const UserPanelChangeNicknameInput = () => {
    const [nickname, setNickname] = useState('')
    const [error, setError] = useState('');
    const { isNicknameChanging } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    function isValidNickname(nickname: string) {
        return /^[a-zA-Z0-9_-]{3,16}$/.test(nickname);
    }

    const onClickClearHandler = () => {
        setNickname('')
    }

    const onClickCancelHandler = () => {
        setNickname('')
        dispatch(userSlice.actions.userInfoChangeNicknameBooleanHandler(false))
    }

    const handleInputNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isValidNickname(event.target.value)) {
            setError('Nickname is invalid.');
        } else {
            setError('');
        }

        setNickname(event.target.value);
    };


    return (
        <div className={'user-panel-nickname-change-wrapper'}>
            <input type="text"
                   className={'user-panel-nickname-change-input'}
                   value={nickname}
                   onChange={handleInputNicknameChange}
                   title={'Enter a new nickname'}
                   placeholder={'Enter a new nickname...'}
                   pattern={'/^[a-zA-Z0-9_-]{3,16}$/'}/>
            {error && <h4 className={'error__label'}>{error}</h4>}
            <div className="user-panel-change-nickname-buttons-wrapper">
                <button className="user-panel-nickname-change-changing__button">
                    <label className="user-panel-nickname-change-changing__button__label">Save</label>
                </button>
                <button className="user-panel-nickname-change-changing__button" onClick={onClickClearHandler}>
                    <label className="user-panel-nickname-change-changing__button__label">Clear</label>
                </button>
                <button className="user-panel-nickname-change-changing__button" onClick={onClickCancelHandler}>
                    <label className="user-panel-nickname-change-changing__button__label">Cancel</label>
                </button>
            </div>
        </div>
    )
}

export default UserPanelChangeNicknameInput
