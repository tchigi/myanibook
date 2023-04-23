import React from 'react'
import { AnimeData } from '../../models/IAnime'
import { useAppDispatch } from '../../hooks/redux'

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


    return (
        <div className='viewed-list-item'>
            <div className='viewed-list-item__current-order'>{currentOrder}</div>
            <div className='viewed-list-item__title'>{title}</div>
            <div className='viewed-list-item__kind'>{showType}</div>
            <button className='viewed-list-item__delete-button'>Delete</button>
        </div>
    );
};

export default ViewedAnimeListItem
