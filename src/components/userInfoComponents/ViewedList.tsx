import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import ViewedAnimeListItem from './ViewedAnimeListItem'
import UserCustomSelect from './UserCustomSelect'

const ViewedList = () => {
    const { viewedAnimeList } = useAppSelector((state) => state.viewedReducer)

    return (
        <div className="viewed-list-wrapper">
            <div className="viewed-list-container">
                <div className="viewed-list-title-container">
                    <div className="viewed-list__title">ANIME LIST</div>
                    <div className={`viewed-list-select-wrapper`}>
                        <div className="select__container">
                            <UserCustomSelect />
                        </div>
                    </div>
                </div>
                <div className="viewed-list-item-container">
                    {viewedAnimeList.map((item, index) => (
                        <ViewedAnimeListItem
                            image={item.attributes.posterImage.original}
                            title={item.attributes.canonicalTitle}
                            showType={item.attributes.showType}
                            key={item.id}
                            id={item.id}
                            anime={item}
                            rating={item.attributes.averageRating}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewedList
