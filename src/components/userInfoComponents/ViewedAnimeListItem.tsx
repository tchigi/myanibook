import React, { useEffect, useState } from 'react'
import { AnimeData } from '../../models/IAnime'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import { fetchAnimeCategories, fetchAnimeGenres } from '../../store/reducers/ActionCreators'
import { viewedSlice } from '../../store/reducers/ViewedSlice'
import styled from 'styled-components'

interface ViewedAnimeListItemProps {
    image: string
    title: string
    showType: string
    id: string
    anime: AnimeData
    rating: string
    index: number
}

const ViewedListItemWrapperStyled = styled.div`
    align-items: center;
    display: grid;
    grid-auto-rows: 30px;
    grid-template-columns: 5% 60% 10% 15% 10%;
    justify-items: center;
    background-color: #1c1f22;
    line-height: 30px;
    cursor: pointer;
    border-bottom: 1px #b84900 dotted;
    border-left: 1px #b84900 dotted;
    border-right: 1px #b84900 dotted;

    &.white {
        background-color: inherit;
    }
    &:hover {
        background-color: #535b65;
    }

    @media (max-width: 720px) {
        line-height: 25px;
        grid-auto-rows: auto;
        grid-template-columns: 10% 75% 15%;
        justify-items: left;
    }
`
const ViewedListItemCurrentOrderStyled = styled.div`
    font-size: 18px;
    justify-self: center;

    @media (max-width: 720px) {
        font-size: 12px;
    }
`
const ViewedListItemTitleStyled = styled.div`
    font-size: 18px;

    @media (max-width: 720px) {
        font-size: 12px;
    }
`
const ViewedListItemKindStyled = styled.div`
    font-size: 16px;

    @media (max-width: 720px) {
        display: none;
    }
`
const ViewedListItemDateStyled = styled.div`
    font-size: 16px;

    @media (max-width: 720px) {
        display: none;
    }
`
const ViewedListItemDeleteButtonWrapperStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    justify-self: center;

    @media (max-width: 720px) {
        height: 20px;
    }
`
const ViewedListItemDeleteButtonStyled = styled.button`
    width: 40px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    background-color: #ff7f7f;
    transition: 0.3s;
    font-size: 20px;

    &:hover {
        background-color: red;
        -webkit-transform: scale(0.95);
        transform: scale(0.95);
    }
    &:active {
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    @media (max-width: 720px) {
        width: 25px;
        height: 15px;
        font-size: 14px;
    }
`
const ViewedListItemDeleteButtonIconStyled = styled.span`
    align-items: center;
    color: #fff;
    display: flex;
    justify-content: center;
`

const ViewedAnimeListItem = ({ image, title, showType, id, anime, rating, index }: ViewedAnimeListItemProps) => {
    const dispatch = useAppDispatch()
    const currentOrder = index + 1
    const { viewedAnimeDayOfAdditionList } = useAppSelector((state) => state.viewedReducer)
    const [dateOfAdd, setDateOfAdd] = useState('')

    function getDateOfAddition(dateOfAddition: string) {
        const currentDate = new Date(Number(dateOfAddition))

        const currentDayOfMonth = currentDate.getDate()
        const currentMonth = currentDate.getMonth() > 9 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`
        const currentYear = currentDate.getFullYear()

        const dateString = `${currentDayOfMonth}/${currentMonth}/${currentYear}`

        return dateString
    }

    useEffect(() => {
        const currentDate = getDateOfAddition(viewedAnimeDayOfAdditionList.filter((item) => item.id === id)[0].dateOfAddition)
        setDateOfAdd(currentDate)
    }, [])

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
        <ViewedListItemWrapperStyled className={index % 2 === 0 ? 'white' : ''}>
            <ViewedListItemCurrentOrderStyled onClick={modalOnClickHandler}>{currentOrder}</ViewedListItemCurrentOrderStyled>
            <ViewedListItemTitleStyled onClick={modalOnClickHandler}>{title}</ViewedListItemTitleStyled>
            <ViewedListItemKindStyled onClick={modalOnClickHandler}>{showType}</ViewedListItemKindStyled>
            <ViewedListItemDateStyled onClick={modalOnClickHandler}>{dateOfAdd}</ViewedListItemDateStyled>
            <ViewedListItemDeleteButtonWrapperStyled>
                <ViewedListItemDeleteButtonStyled onClick={onClickDeleteButtonHandler}>
                    <ViewedListItemDeleteButtonIconStyled>✖</ViewedListItemDeleteButtonIconStyled>
                </ViewedListItemDeleteButtonStyled>
            </ViewedListItemDeleteButtonWrapperStyled>
        </ViewedListItemWrapperStyled>
    )
}

export default ViewedAnimeListItem
