import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import ViewedAnimeListItem from './ViewedAnimeListItem'
import UserCustomSelect from './UserCustomSelect'
import { AnimeData } from '../../models/IAnime'

const ViewedList = () => {
    const { viewedAnimeList } = useAppSelector((state) => state.viewedReducer)
    const { viewedAnimeSortType } = useAppSelector((state) => state.userReducer)
    const [sortedArray, setSortedArray] = useState(viewedAnimeList)
    const viewedAnimeListClone = viewedAnimeList.slice()

    const sortAZ = (a: AnimeData, b: AnimeData) => {
        const newA = a.attributes.canonicalTitle
        const newB = b.attributes.canonicalTitle
        if (newA > newB) return 1
        else if (newA < newB) return -1
        else return 0
    }
    const sortZA = (a: AnimeData, b: AnimeData) => {
        const newA = a.attributes.canonicalTitle
        const newB = b.attributes.canonicalTitle
        if (newA < newB) return 1
        else if (newA > newB) return -1
        else return 0
    }

    const arraySortHandler = () => {
        const a = viewedAnimeListClone.reverse().slice()
        const b = viewedAnimeListClone.sort(sortAZ).slice()
        const c = viewedAnimeListClone.sort(sortZA).slice()

        if (viewedAnimeSortType === `sortByDateFirstOld`) {
            setSortedArray(viewedAnimeList)
        }
        if (viewedAnimeSortType === `sortByDateFirstNew`) {
            setSortedArray(a)
        }
        if (viewedAnimeSortType === `sortByNameAZ`) {
            setSortedArray(b)
        }
        if (viewedAnimeSortType === `sortByNameZA`) {
            setSortedArray(c)
        }
    }

    useEffect(() => {
        arraySortHandler()
    }, [viewedAnimeSortType])

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
                <div className="viewed-list-item-container">{
                    sortedArray.map((item, index) => (
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
                        ))
                }</div>
            </div>
        </div>
    )
}

export default ViewedList
