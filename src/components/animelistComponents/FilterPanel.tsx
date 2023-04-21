import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import CustomSelect from './filterPanelComponents/CustomSelect'
import { fetchCategoriesList, fetchGenresList } from '../../store/reducers/ActionCreators'

const FilterPanel = () => {
    const dispatch = useAppDispatch()
    const { genres } = useAppSelector((state) => state.genresReducer)
    const { categories } = useAppSelector((state) => state.categoriesReducer)
    const genresOptions: any[] = []
    const categoriesOptions: any[] = []
    const recommendedSortOptions: any[] = []

    useEffect(() => {
        dispatch(fetchGenresList())
        dispatch(fetchCategoriesList())
    }, [])

    const createGenresOptions = () => {
        if (genresOptions.length === 0) {
            genres.data.map((item) => {
                return genresOptions.push({ value: `${item.attributes.name}`, label: `${item.attributes.name}` })
            })
        }
    }
    const createCategoriesOptions = () => {
        if (categoriesOptions.length === 0) {
            categories.data.forEach((item) => {
                return categoriesOptions.push({ value: `${item.attributes.title}`, label: `${item.attributes.title}` })
            })
        }
    }

    const createRecSortOptions = () => {
        const valueArr = ['id', '-averageRating', 'popularityRank']
        const labelArr = ['Default', 'Rating', 'Popularity']

        if (recommendedSortOptions.length === 0) {
            for (let i = 0; i < valueArr.length; i++) {
                recommendedSortOptions.push({ value: `${valueArr[i]}`, label: `${labelArr[i]}` })
            }
        }
    }
    createGenresOptions()
    createCategoriesOptions()
    createRecSortOptions()

    return (
        <div className={'filter-panel-wrapper'}>
            <div className="filter__panel__container">
                <div className={`select__wrapper`}>
                    <h4 className="select__title filter__panel__title">Select genres:</h4>
                    <div className="select__container">
                        <CustomSelect selectSortType={'genres'} isMulti options={genresOptions} />
                    </div>
                </div>
                <div className={`select__wrapper`}>
                    <h4 className="select__title filter__panel__title">Select categories:</h4>
                    <div className="select__container">
                        <CustomSelect selectSortType={'categories'} isMulti options={categoriesOptions} />
                    </div>
                </div>
                <div className={`sort-by-recs-container select__wrapper`}>
                    <h4 className="select__title filter__panel__title">Sort by:</h4>
                    <div className="select__container">
                        <CustomSelect selectSortType={'recommended'} isMulti={false} options={recommendedSortOptions} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterPanel
