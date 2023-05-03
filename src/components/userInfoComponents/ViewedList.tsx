import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import ViewedAnimeListItem from './ViewedAnimeListItem'
import UserCustomSelect from './UserCustomSelect'
import { AnimeData } from '../../models/IAnime'
import AnimeModal from '../animelistComponents/AnimeModal'

const ViewedList = () => {
    const { viewedAnimeList, viewedAnimeDayOfAdditionList } = useAppSelector((state) => state.viewedReducer)
    const { viewedAnimeSortType } = useAppSelector((state) => state.userReducer)
    const [sortedArray, setSortedArray] = useState(viewedAnimeList)
    const viewedAnimeListClone = viewedAnimeList.slice()

    const sortByName = (a: AnimeData, b: AnimeData) => {
        const newA = a.attributes.canonicalTitle
        const newB = b.attributes.canonicalTitle
        if (newA > newB) return 1
        else if (newA < newB) return -1
        else return 0
    }
    const sortByDate = (a: AnimeData, b: AnimeData) => {
        const newA = viewedAnimeDayOfAdditionList.find(x=>x.id === a.id)?.dateOfAddition || 0
        const newB = viewedAnimeDayOfAdditionList.find(x=>x.id === b.id)?.dateOfAddition || 0
        if (newA < newB) return 1
        else if (newA > newB) return -1
        else return 0
    }

    const arraySortHandler = () => {
        const a = viewedAnimeListClone.sort(sortByName).slice()
        const b = viewedAnimeListClone.sort(sortByName).reverse().slice()
        const c = viewedAnimeListClone.sort(sortByDate).slice()
        const d = viewedAnimeListClone.sort(sortByDate).reverse().slice()

        if (viewedAnimeSortType === `sortByNameAZ`) {
            setSortedArray(a)
        }
        if (viewedAnimeSortType === `sortByNameZA`) {
            setSortedArray(b)
        }
        if (viewedAnimeSortType === `sortByDateFirstOld`) {
            setSortedArray(d)
        }
        if (viewedAnimeSortType === `sortByDateFirstNew`) {
            setSortedArray(c)
        }
    }

    useEffect(() => {
        arraySortHandler()
    }, [viewedAnimeSortType, viewedAnimeList])

    return (
        <div className="viewed-list-wrapper">
            <AnimeModal />

            {viewedAnimeList.length === 0 ? <h1>Your anime list is empty</h1> : ''}

            <div className={`viewed-list-container ${viewedAnimeList.length > 0 ? '' : 'hidden'}`}>
                <div className="viewed-list-title-container">
                    <div className="viewed-list__title">ANIME LIST</div>
                    <div className={`viewed-list-select-wrapper`}>
                        <div className="select__container">
                            <UserCustomSelect />
                        </div>
                    </div>
                </div>

                <div className={`viewed-list-table-wrapper`}>
                    <div className="viewed-list-order-control viewed-list__grid__item">
                        <p>#</p>
                        <p>Name</p>
                        <p>Type</p>
                        <p>Date Of Addition</p>
                    </div>
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
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewedList
