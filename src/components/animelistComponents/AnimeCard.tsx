import React, { useEffect, useState } from 'react'
import { AnimeData } from '../../models/IAnime'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { viewedSlice } from '../../store/reducers/ViewedSlice'
import AnimeModal from './AnimeModal'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import { fetchAnimeCategories, fetchAnimeGenres } from '../../store/reducers/ActionCreators'

interface AnimeCardProps {
    image: string
    title: string
    showType: string
    id: string
    anime: AnimeData
    rating: string,
}

const AnimeCard = ({ image, title, showType, id, anime, rating }: AnimeCardProps) => {
    const [wasViewed, setWasViewed] = useState(false)

    useEffect(() => {
        setWasViewed(checkAnimeInList(id))
    }, [])

    const dispatch = useAppDispatch()

    const { viewedAnimeList } = useAppSelector((state) => state.viewedReducer)

    function checkAnimeInList(animeId: string) {
        return !!viewedAnimeList.find((i) => i.id === animeId)
    }

    function getCurrentDate() {
        const currentDate = new Date().toString();

        return currentDate
    }

    function addToViewedAnimeDateOfAdditionList() {
        const currentDate = getCurrentDate()
        return {
            id: id,
            dateOfAddition: currentDate
        }
    }

    function onClickHandler(e:any) {
        if (wasViewed) {
            dispatch(viewedSlice.actions.removeAnimeFromViewedList(anime))
            setWasViewed(false)
            dispatch(viewedSlice.actions.removeAnimeFromDateOfAdditionList(id))
        } else {
            dispatch(viewedSlice.actions.addAnimeToViewedList(anime))
            setWasViewed(true)
            dispatch(viewedSlice.actions.addAnimeToDateOfAdditionList(addToViewedAnimeDateOfAdditionList()))
        }
    }

    function modalOnClickHandler() {
        dispatch(animeSlice.actions.modalHandler(true))
        dispatch(animeSlice.actions.modalSelectAnime(anime))
        dispatch(fetchAnimeGenres(anime.relationships.genres.links.related))
        dispatch(fetchAnimeCategories(anime.relationships.categories.links.related))
    }

    return (
        <div className={'anime-card-wrapper'}>
            <img src={image} alt="" className="anime-card-img" onClick={modalOnClickHandler}/>
            <div className="anime-card-rating">{rating}</div>
            <div className="anime-card-description-wrapper">
                <div className="anime-card-title" onClick={modalOnClickHandler}>{title}</div>
                <div className="anime-card-show-type" onClick={modalOnClickHandler}>{showType}</div>
            </div>
            <div className={wasViewed ? 'completed-button-wrapper active' : 'completed-button-wrapper'}>
                <button className="completed-button" onClick={onClickHandler}></button>
            </div>
        </div>
    )
}

export default AnimeCard
