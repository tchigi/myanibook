import React from 'react'
import { AnimeData } from '../../models/IAnime'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import { fetchAnimeCategories, fetchAnimeGenres } from '../../store/reducers/ActionCreators'
import { viewedSlice } from '../../store/reducers/ViewedSlice'

interface ViewedAnimeListItemProps {
    image: string
    title: string
    showType: string
    id: string
    anime: AnimeData
    rating: string,
    index: number
}
const ViewedAnimeListItem = ({ image, title, showType, id, anime, rating, index }: ViewedAnimeListItemProps) => {
    const dispatch = useAppDispatch()
    const currentOrder = index + 1
    const { viewedAnimeDayOfAdditionList } = useAppSelector(state => state.viewedReducer)

    function getDateOfAddition() {
        return viewedAnimeDayOfAdditionList.find(item => item.id === id)?.dateOfAddition
    }

    function modalOnClickHandler() {
        dispatch(animeSlice.actions.modalHandler(true))
        dispatch(animeSlice.actions.modalSelectAnime(anime))
        dispatch(fetchAnimeGenres(anime.relationships.genres.links.related))
        dispatch(fetchAnimeCategories(anime.relationships.categories.links.related))
    }

    function onClickDeleteButtonHandler() {
        dispatch(viewedSlice.actions.removeAnimeFromViewedList(anime))
        dispatch(viewedSlice.actions.removeAnimeFromDateOfAdditionList(id))
    }

    return (
        <div className={`viewed-list-item-wrapper ${index % 2 === 0 ? 'white' : ''} viewed-list__grid__item`}>
            <div className="viewed-list-item__current-order" onClick={modalOnClickHandler}>{currentOrder}</div>
            <div className="viewed-list-item__title" onClick={modalOnClickHandler}>{title}</div>
            <div className="viewed-list-item__kind" onClick={modalOnClickHandler}>{showType}</div>
            <div className="viewed-list-item__date-of-addition" onClick={modalOnClickHandler}>{getDateOfAddition()}</div>
            <div className='viewed-list-item__delete-button-wrapper'>
                <button className="viewed-list-item__delete-button" onClick={onClickDeleteButtonHandler}>
                    <span className='viewed-list-item__delete-button-icon'>✖</span>
                </button>
            </div>
        </div>
    )
};

export default ViewedAnimeListItem
