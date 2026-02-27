import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import ViewedAnimeListItem from './ViewedAnimeListItem'
import UserCustomSelect from './UserCustomSelect'
import { AnimeData } from '../../models/IAnime'
import AnimeModal from '../animelistComponents/AnimeModal'
import IViewedAnime from '../../models/IViewedAnime'
import { IDecodedUserInfo } from '../../models/IDecodedToken'
import { fetchAnimeDetailsByIds } from '../../store/reducers/ActionCreators'
import styled from 'styled-components'

const ViewedListWrapperStyled = styled.div`
    width: 80%;
    border-radius: 20px;
    padding: 10px;
    background-color: #2e3338;

    @media (max-width: 768px) {
        width: 100%;
        border-radius: 10px;

        & h1 {
            font-size: 18px;
        }
    }
`
const ViewedListContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
`
const ViewedListTitleContainerStyled = styled.div`
    border-radius: 20px 20px 0 0;
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: #25292d;
    border-left: 5px solid #b84900;

    @media (max-width: 768px) {
        border-radius: 10px 10px 0 0;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0;
    }
`
const ViewedListTitleStyled = styled.div`
    text-align: left;
    line-height: 60px;
    font-size: 28px;
    font-family: 'Bahnschrift';

    @media (max-width: 768px) {
        font-size: 22px;
        line-height: 50px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        line-height: 30px;
    }
`
const ViewedListSelectWrapperStyled = styled.div`
`
const ViewedListTableWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    overflow: hidden;
`
const ViewedListTableOrderControlStyled = styled.div`
    font-size: 14px;
    background-color: #b84900;
    font-weight: bold;
    align-items: center;
    display: grid;
    grid-auto-rows: 30px;
    grid-template-columns: 5% 60% 10% 15% 10%;
    justify-items: center;

    @media (max-width: 768px) {
        font-size: 13px;
        grid-auto-rows: 25px;
    }

    @media (max-width: 480px) {
        font-size: 12px;
        grid-auto-rows: 20px;
        grid-template-columns: 10% 75% 15%;

        & .mobile-hidden {
            display: none;
        }
    }
`
const SelectContainerStyled = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 18px;

    @media (max-width: 768px) {
        display: block;
        font-size: 14px;
        padding: 0;
    }
`

const ViewedList = () => {
    const dispatch = useAppDispatch()
    const { viewedAnimeSortType, decodedUserInfo } = useAppSelector((state) => state.userReducer)
    const animeDetails = useAppSelector((state) => state.viewedReducer.viewedAnimeDetails)
    const [sortedArray, setSortedArray] = useState<AnimeData[]>([])

    const animeList: IViewedAnime[] = useMemo(() => {
        if (!decodedUserInfo) return []
        return (decodedUserInfo as IDecodedUserInfo).animeList ?? []
    }, [decodedUserInfo])

    useEffect(() => {
        if (animeList.length === 0) return
        dispatch(fetchAnimeDetailsByIds(animeList))
    }, [animeList])

    const sortByName = (a: AnimeData, b: AnimeData) => {
        const newA = a.attributes.canonicalTitle
        const newB = b.attributes.canonicalTitle
        if (newA > newB) return 1
        else if (newA < newB) return -1
        else return 0
    }
    const sortByDate = (a: AnimeData, b: AnimeData) => {
        const newA = animeList.find((x) => String(x.id) === a.id)?.addedAt || ''
        const newB = animeList.find((x) => String(x.id) === b.id)?.addedAt || ''
        if (newA < newB) return 1
        else if (newA > newB) return -1
        else return 0
    }
    const arraySortHandler = () => {
        const activeDetails = animeDetails.filter((d) => animeList.some((v) => String(v.id) === d.id))
        const clone = activeDetails.slice()
        if (viewedAnimeSortType === 'sortByNameAZ') setSortedArray(clone.sort(sortByName))
        else if (viewedAnimeSortType === 'sortByNameZA') setSortedArray(clone.sort(sortByName).reverse())
        else if (viewedAnimeSortType === 'sortByDateFirstOld') setSortedArray(clone.sort(sortByDate).reverse())
        else if (viewedAnimeSortType === 'sortByDateFirstNew') setSortedArray(clone.sort(sortByDate))
        else setSortedArray(clone)
    }

    useEffect(() => {
        arraySortHandler()
    }, [viewedAnimeSortType, animeDetails, animeList])

    return (
        <ViewedListWrapperStyled>
            <AnimeModal />

            {animeList.length === 0 ? <h1>Your anime list is empty</h1> : ''}

            <ViewedListContainerStyled className={animeList.length > 0 ? '' : 'hidden'}>
                <ViewedListTitleContainerStyled>
                    <ViewedListTitleStyled>ANIME LIST</ViewedListTitleStyled>
                    <ViewedListSelectWrapperStyled>
                        <SelectContainerStyled>
                            <UserCustomSelect />
                        </SelectContainerStyled>
                    </ViewedListSelectWrapperStyled>
                </ViewedListTitleContainerStyled>

                <ViewedListTableWrapperStyled>
                    <ViewedListTableOrderControlStyled>
                        <p>#</p>
                        <p>Name</p>
                        <p className={'mobile-hidden'}>Type</p>
                        <p className={'mobile-hidden'}>Date Of Addition</p>
                    </ViewedListTableOrderControlStyled>
                    {sortedArray.map((item, index) => (
                        <ViewedAnimeListItem
                            image={item.attributes.posterImage.original}
                            title={item.attributes.canonicalTitle}
                            showType={item.attributes.showType}
                            key={item.id}
                            id={item.id}
                            anime={item}
                            rating={item.attributes.averageRating}
                            index={index}
                            addedAt={animeList.find((v) => String(v.id) === item.id)?.addedAt || ''}
                        />
                    ))}
                </ViewedListTableWrapperStyled>
            </ViewedListContainerStyled>
        </ViewedListWrapperStyled>
    )
}

export default ViewedList
