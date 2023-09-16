import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import CustomSelect from './filterPanelComponents/CustomSelect'
import { fetchCategoriesList, fetchGenresList } from '../../store/reducers/ActionCreators'
import styled from 'styled-components'

const FilterPanelWrapperStyled = styled.div`
    position: relative;
    width: 20%;
    background-color: #2e3338;
    border-radius: 20px;

    & .filter-panel-mobile-logo-svg {
        display: none;
    }

    @media (max-width: 720px) {
        position: static;
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        border-radius: 10px;
        background-color: #2e3338;
        transition: 0.3s;
        padding: 10px;

        &.active {
            gap: 30px;
            height: auto;
        }
    }
`
const FilterPanelMobileVision = styled.div`
    display: none;

    @media (max-width: 720px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 5px 20px 5px 10px;
        border-radius: 10px;
        cursor: pointer;
        background-color: #1c1f22;
    }
`
const FilterPanelMobileVisionP = styled.p`
    display: none;

    @media (max-width: 720px) {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        display: inline;
        line-height: 14px;
    }
`
const FilterPanelSpan = styled.span`
    display: none;

    @media (max-width: 720px) {
        position: relative;
        display: block;
        width: 2px;
        height: 15px;
        background-color: #ff6600;
        transition: 0.3s;

        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(-45%, -40%);
            width: 15px;
            height: 2px;
            background-color: #ff6600;
        }

        &.active {
            transform: rotate(90deg);
        }

        &.active::before {
            width: 0;
            height: 0;
        }
    }
`
const FilterPanelContainerStyled = styled.div`
    padding-top: 15px;
    position: sticky;
    top: 70px;
    left: 0;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border-radius: 20px;

    @media (max-width: 720px) {
        position: static;
        padding-top: 0;
        width: 100%;
    }
`
const FilterPanelTitleStyled = styled.h4`
    padding-left: 10px;
    text-align: left;
    width: 100%;
    line-height: 30px;
    font-size: 18px;
    font-family: 'Bahnschrift';
    background-color: #25292d;
    border-left: 5px solid #b84900;

    @media (max-width: 720px) {
        display: none;

        &.active {
            display: inline;
            line-height: 20px;
            font-size: 14px;
        }
    }
`
const SelectWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;

    @media (max-width: 720px) {
        display: none;
        gap: 0;

        &.active {
            display: flex;
        }
    }
`
const SelectContainerStyled = styled.div`
    width: 100%;
    padding: 10px;
    font-size: 18px;

    @media (max-width: 720px) {
        display: none;

        &.active {
            display: block;
            font-size: 14px;
            padding: 5px;
        }
    }
`

const FilterPanel = () => {
    const dispatch = useAppDispatch()
    // const { genres } = useAppSelector((state) => state.genresReducer)
    const { categories } = useAppSelector((state) => state.categoriesReducer)
    // const genresOptions: any[] = []
    const categoriesOptions: any[] = []
    const recommendedSortOptions: any[] = []
    const ageRatingOptions = [
        { value: 'G,PG,R', label: 'ALL' },
        { value: 'G', label: 'G' },
        { value: 'PG', label: 'PG' },
        { value: 'R', label: 'R' },
    ]
    const subTypeOptions = [
        { value: 'TV,movie,special,ONA,OVA,music', label: 'ALL' },
        { value: 'TV', label: 'TV' },
        { value: 'movie', label: 'Movie' },
        { value: 'special', label: 'special' },
        { value: 'ONA', label: 'ONA' },
        { value: 'OVA', label: 'OVA' },
        { value: 'music', label: 'music' },
    ]
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        // dispatch(fetchGenresList())
        dispatch(fetchCategoriesList())
    }, [])

    // const createGenresOptions = () => {
    //     if (genresOptions.length === 0) {
    //         genres.data.map((item) => {
    //             return genresOptions.push({ value: `${item.attributes.name}`, label: `${item.attributes.name}` })
    //         })
    //     }
    // }
    const createCategoriesOptions = () => {
        if (categoriesOptions.length === 0) {
            categories.data.forEach((item) => {
                return categoriesOptions.push({ value: `${item.attributes.title}`, label: `${item.attributes.title}` })
            })
        }
    }
    const createRecSortOptions = () => {
        const valueArr = ['-averageRating', '-userCount', '-start_date']
        const labelArr = ['Rating', 'Popularity', 'Date']

        if (recommendedSortOptions.length === 0) {
            for (let i = 0; i < valueArr.length; i++) {
                recommendedSortOptions.push({ value: `${valueArr[i]}`, label: `${labelArr[i]}` })
            }
        }
    }

    // createGenresOptions()
    createCategoriesOptions()
    createRecSortOptions()

    const onClickHandler = () => {
        setIsActive((prev) => !prev)
    }

    return (
        <FilterPanelWrapperStyled className={isActive ? 'active' : ''}>
            <FilterPanelMobileVision className={isActive ? 'active' : ''} onClick={onClickHandler}>
                <FilterPanelMobileVisionP>Filters:</FilterPanelMobileVisionP>
                <FilterPanelSpan className={isActive ? 'active' : ''} />
            </FilterPanelMobileVision>
            <FilterPanelContainerStyled>
                <SelectWrapperStyled className={isActive ? 'active' : ''}>
                    <FilterPanelTitleStyled className={isActive ? 'active' : ''}>Select categories:</FilterPanelTitleStyled>
                    <SelectContainerStyled className={isActive ? 'active' : ''}>
                        <CustomSelect selectSortType={'categories'} isMulti options={categoriesOptions} />
                    </SelectContainerStyled>
                </SelectWrapperStyled>
                <SelectWrapperStyled className={isActive ? 'active' : ''}>
                    <FilterPanelTitleStyled className={isActive ? 'active' : ''}>Show type:</FilterPanelTitleStyled>
                    <SelectContainerStyled className={isActive ? 'active' : ''}>
                        <CustomSelect selectSortType={'subtype'} isMulti options={subTypeOptions} />
                    </SelectContainerStyled>
                </SelectWrapperStyled>
                <SelectWrapperStyled className={isActive ? 'active' : ''}>
                    <FilterPanelTitleStyled className={isActive ? 'active' : ''}>Rating:</FilterPanelTitleStyled>
                    <SelectContainerStyled className={isActive ? 'active' : ''}>
                        <CustomSelect selectSortType={'ageRating'} isMulti options={ageRatingOptions} />
                    </SelectContainerStyled>
                </SelectWrapperStyled>
                <SelectWrapperStyled className={isActive ? 'active' : ''}>
                    <FilterPanelTitleStyled className={isActive ? 'active' : ''}>Sort by:</FilterPanelTitleStyled>
                    <SelectContainerStyled className={isActive ? 'active' : ''}>
                        <CustomSelect selectSortType={'recommended'} isMulti={false} options={recommendedSortOptions} />
                    </SelectContainerStyled>
                </SelectWrapperStyled>
            </FilterPanelContainerStyled>
        </FilterPanelWrapperStyled>
    )
}

export default FilterPanel
