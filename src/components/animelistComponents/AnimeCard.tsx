import React, { useEffect, useState } from 'react'
import { AnimeData } from '../../models/IAnime'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { viewedSlice } from '../../store/reducers/ViewedSlice'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import { fetchAnimeCategories, fetchAnimeGenres } from '../../store/reducers/ActionCreators'
import styled from 'styled-components'
import completed from '../../assets/images/viewed_logo.png'

interface AnimeCardProps {
    image: string
    title: string
    showType: string
    id: string
    anime: AnimeData
    rating: string
}

const AnimeCardStyled = styled.div`
    border: 3px #2e3338 solid;
    background-color: #1c1f22;
    border-radius: 20px;
    width: 250px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    position: relative;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-right: 2px #ff6600 solid;
        border-left: 2px #ff6600 solid;
        border-radius: 10px;
        transition: 0.5s;
        transform: scaleY(0);
        pointer-events: none;
    }
    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-top: 2px #ff6600 solid;
        border-bottom: 2px #ff6600 solid;
        border-radius: 10px;
        transition: 0.5s;
        transform: scaleX(0);
        pointer-events: none;
    }
    &:hover::before,
    &:hover::after {
        transform: scale(1);
    }
    &:hover {
        border: 3px #2e3338 solid;
    }

    @media (max-width: 720px) {
        border: 1px #2e3338 solid;
        width: 145px;
        padding: 5px;
        gap: 5px;
        border-radius: 10px;

        &::before {
            border-right: 1px #ff6600 solid;
            border-left: 1px #ff6600 solid;
        }
        &::after {
            border-top: 1px #ff6600 solid;
            border-bottom: 1px #ff6600 solid;
        }
        &:hover {
            border: 1px #2e3338 solid;
        }
    }
`

const AnimeCardImageStyled = styled.img.attrs((props) => ({
    src: props.src,
}))`
    width: 230px;
    height: 300px;
    align-self: center;
    border-radius: 10px;
    box-sizing: border-box;

    @media (max-width: 720px) {
        width: 130px;
        height: 200px;
    }
`

const AnimeCardDescriptionWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;

    @media (max-width: 720px) {
        gap: 5px;
    }
`

const AnimeCardShowTypeStyled = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-transform: capitalize;
    transition: 0.3s;

    &:hover {
        color: #ff6600;
    }

    @media (max-width: 720px) {
        font-size: 12px;
    }
`

const AnimeCardTitleStyled = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transition: 0.3s;

    &:hover {
        color: #ff6600;
    }

    @media (max-width: 720px) {
        font-size: 16px;
    }
`

const AnimeCardRatingStyled = styled.div`
    position: absolute;
    bottom: 20%;
    left: 5%;
    width: 50px;
    height: 50px;
    border: 1px solid #ff6600;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    background: #1c1f22;

    @media (max-width: 720px) {
        bottom: 20%;
        left: 5%;
        width: 40px;
        height: 40px;
        font-size: 14px;
    }
`

const CompletedButtonWrapperStyled = styled.div`
    width: 35px;
    height: 25px;
    position: absolute;
    bottom: 2%;
    right: 3%;
    background-color: grey;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    z-index: 10;

    &:hover {
        background-color: white;
        opacity: 1;
    }

    &.active {
        opacity: 1;
        background-color: #ff6600;
    }
    &.active:hover {
        background-color: #b84900;
        opacity: 1;
    }

    @media (max-width: 720px) {
        width: 20px;
        height: 15px;
        border-radius: 5px;
    }
`

const CompletedButtonStyled = styled.button`
    width: 75%;
    height: 75%;
    background-image: url(${completed});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: inherit;
    border-radius: 10px;
`

const AnimeCard = ({ image, title, showType, id, anime, rating }: AnimeCardProps) => {
    const [wasViewed, setWasViewed] = useState(false)
    const dispatch = useAppDispatch()
    const { viewedAnimeList } = useAppSelector((state) => state.viewedReducer)

    useEffect(() => {
        setWasViewed(checkAnimeInList(id))
    }, [])

    function checkAnimeInList(animeId: string) {
        return !!viewedAnimeList.find((i) => i.id === animeId)
    }

    function getCurrentDate() {
        return new Date().getTime().toString()
    }

    function addToViewedAnimeDateOfAdditionList() {
        const currentDate = getCurrentDate()
        return {
            id: id,
            dateOfAddition: currentDate,
        }
    }

    function onClickHandler() {
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
        dispatch(animeSlice.actions.modalSelectAnime(anime))
        dispatch(fetchAnimeGenres(anime.relationships.genres.links.related))
        dispatch(fetchAnimeCategories(anime.relationships.categories.links.related))
        dispatch(animeSlice.actions.modalHandler(true))
    }

    return (
        <AnimeCardStyled>
            <AnimeCardImageStyled src={image} alt="" onClick={modalOnClickHandler} />
            <AnimeCardRatingStyled>{rating}</AnimeCardRatingStyled>
            <AnimeCardDescriptionWrapperStyled>
                <AnimeCardTitleStyled onClick={modalOnClickHandler}>{title}</AnimeCardTitleStyled>
                <AnimeCardShowTypeStyled onClick={modalOnClickHandler}>{showType}</AnimeCardShowTypeStyled>
            </AnimeCardDescriptionWrapperStyled>
            <CompletedButtonWrapperStyled className={wasViewed ? 'active' : ''}>
                <CompletedButtonStyled onClick={onClickHandler}></CompletedButtonStyled>
            </CompletedButtonWrapperStyled>
        </AnimeCardStyled>
    )
}

export default AnimeCard
