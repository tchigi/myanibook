import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { animeSlice } from '../../store/reducers/AnimeSlice'
import styled from 'styled-components'

const AnimeCardModalStyled = styled.div`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;

    &.active {
        opacity: 1;
        pointer-events: all;
        background-color: rgba(0, 0, 0, 0.8);
    }
    @media (max-width: 720px) {
        overflow: scroll;
    }
`
const AnimeCardModalContentStyled = styled.div`
    position: relative;
    width: 50%;
    height: auto;
    background-color: #1c1f22;
    border: 3px #ff6600 solid;
    border-radius: 20px;
    transition: 0.5s;
    display: flex;
    justify-content: space-evenly;
    padding: 40px;
    gap: 20px;

    &.active {
    }

    @media (max-width: 720px) {
        transform: none;
        flex-direction: column;
        justify-content: flex-start;
        width: 320px;
        padding: 0;
        gap: 0;
        height: 100%;
        border: 0;
        background-color: #1c1f22;
        border-radius: 0;
    }
`
const AnimeCardModalImageWrapperStyled = styled.div`
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-evenly;
    background-color: #2e3338;
    padding: 10px;
    border-radius: 20px;

    @media (max-width: 720px) {
        background-color: inherit;
    }
`
const AnimeCardModalImageStyled = styled.img.attrs((props) => ({
    src: props.src,
}))`
    width: 300px;
    height: 400px;
    border-radius: 10px;
    align-self: center;

    @media (max-width: 720px) {
    }
`
const AnimeCardModalTitleStyled = styled.div`
    font-size: 24px;
    text-align: center;
    font-weight: bold;

    @media (max-width: 720px) {
        font-size: 20px;
    }
`
const AnimeCardModalInfoBlockStyled = styled.div`
    font-size: 12px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    @media (max-width: 720px) {
    }
`
const AnimeCardModalRatingStyled = styled.div``
const AnimeCardModalDescriptionStyled = styled.div`
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #2e3338;
    gap: 15px;
    padding: 10px;
    border-radius: 20px;
    line-height: 1.25;

    & p {
        display: inline;
        color: #b84900;
    }

    @media (max-width: 720px) {
        border-radius: 0;
        font-size: 12px;
        background-color: inherit;
    }
`
const AnimeCardModalSynopsisStyled = styled.div`
    text-align: justify;
`
const AnimeCardModalInfoStyled = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
`
const AnimeCardModalCloseButton = styled.button`
    height: 30px;
    width: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #b84900;
    border-radius: 5px;
    transition: 0.3s;
    stroke: #ffffff;

    &:hover svg {
        stroke: #ff6600;
    }

    @media (max-width: 720px) {
        top: 0;
        right: unset;
        position: fixed;
    }
`

const AnimeModal = () => {
    const { isModalActive, selectedAnime, categories, genres } = useAppSelector((state) => state.animeReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {}, [selectedAnime])

    const releaseDateMorph = humanReadableDate(selectedAnime.attributes.startDate)

    function humanReadableDate(string: string | null) {
        if (!string) {
            return 'Date unknown'
        }

        const arr = string.split('-')
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return `${arr[2]} ${month[Number(arr[1]) - 1]} ${arr[0]}`
    }

    return (
        <AnimeCardModalStyled className={`${isModalActive ? 'active' : ''}`} onClick={() => dispatch(animeSlice.actions.modalHandler(false))}>
            <AnimeCardModalContentStyled className={`${isModalActive ? 'active' : ''}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <AnimeCardModalImageWrapperStyled>
                    <AnimeCardModalImageStyled src={selectedAnime.attributes.posterImage.original} alt="" />
                    <AnimeCardModalTitleStyled>{selectedAnime.attributes.canonicalTitle}</AnimeCardModalTitleStyled>
                    <AnimeCardModalInfoBlockStyled>
                        <div>{selectedAnime.attributes.showType}</div>
                        <div>{releaseDateMorph}</div>
                        <AnimeCardModalRatingStyled>
                            Rating: <span>{selectedAnime.attributes.averageRating}</span>
                        </AnimeCardModalRatingStyled>
                    </AnimeCardModalInfoBlockStyled>
                </AnimeCardModalImageWrapperStyled>
                <AnimeCardModalDescriptionStyled>
                    <AnimeCardModalSynopsisStyled>
                        <p>Description: </p>
                        {selectedAnime.attributes.description}
                    </AnimeCardModalSynopsisStyled>
                    {/*<AnimeCardModalInfoStyled>*/}
                    {/*    <p>Genres: </p>*/}
                    {/*    {genres.data.map((item, index) => {*/}
                    {/*        return (*/}
                    {/*            <span key={item.id}>*/}
                    {/*                {item.attributes.name}*/}
                    {/*                {genres.data.length - 1 !== index ? ', ' : ''}*/}
                    {/*            </span>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*</AnimeCardModalInfoStyled>*/}
                    <AnimeCardModalInfoStyled>
                        <p>Categories: </p>
                        {categories.data.map((item, index) => {
                            return (
                                <span key={item.id}>
                                    {item.attributes.title}
                                    {categories.data.length - 1 !== index ? ', ' : ''}
                                </span>
                            )
                        })}
                    </AnimeCardModalInfoStyled>
                    <AnimeCardModalInfoStyled>
                        <p>Year:</p>
                        <span>{selectedAnime.attributes.startDate}</span>
                    </AnimeCardModalInfoStyled>
                    <AnimeCardModalInfoStyled>
                        <p>Show Type:</p>
                        <span>{selectedAnime.attributes.subtype}</span>
                    </AnimeCardModalInfoStyled>
                    <AnimeCardModalInfoStyled>
                        <p>Age Rating:</p>
                        <span>{selectedAnime.attributes.ageRating}</span>
                    </AnimeCardModalInfoStyled>
                </AnimeCardModalDescriptionStyled>
                <AnimeCardModalCloseButton onClick={() => dispatch(animeSlice.actions.modalHandler(false))}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.64645" y1="19.6464" x2="19.6464" y2="0.64645" />
                        <line x1="0.35355" y1="0.64645" x2="19.3536" y2="19.6464" />
                    </svg>
                </AnimeCardModalCloseButton>
            </AnimeCardModalContentStyled>
        </AnimeCardModalStyled>
    )
}

export default AnimeModal
