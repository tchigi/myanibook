import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { animeSlice } from '../../store/reducers/AnimeSlice'

const AnimeModal = () => {
    const { isModalActive, selectedAnime, categories, genres } = useAppSelector((state) => state.animeReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {}, [selectedAnime])

    function isActive(string: string) {
        return isModalActive ? `${string} active` : string
    }

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
        <div className={isActive('anime-card-modal')} onClick={() => dispatch(animeSlice.actions.modalHandler(false))}>
            <div className={isActive('anime__card__modal__content')} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <div className="anime__card__modal__img__wrapper">
                    <img src={selectedAnime.attributes.posterImage.original} className={'anime__card__modal__img'} alt="" />
                    <div className="anime__card__modal__title">{selectedAnime.attributes.canonicalTitle}</div>
                    <div className="anime__card__model__info__block">
                        <div>{selectedAnime.attributes.showType}</div>
                        <div>{releaseDateMorph}</div>
                        <div className="anime__card__modal__rating">
                            Rating: <span>{selectedAnime.attributes.averageRating}</span>
                        </div>
                    </div>
                </div>
                <div className="anime__card__modal__description">
                    <div className={'anime-card-modal-synopsis'}>
                        <p>Description: </p>
                        {selectedAnime.attributes.description}
                    </div>

                    <div className="anime-card-modal-genres-wrapper">
                        <p>Genres: </p>
                        {genres.data.map((item, index) => {
                            return <span key={item.id}>{item.attributes.name}{genres.data.length - 1 !== index ? ', ' : ''}</span>
                        })}
                    </div>

                    <div className="anime-card-modal-categories-wrapper">
                        <p>Categories: </p>
                        {categories.data.map((item, index) => {
                            return <span key={item.id}>{item.attributes.title}{categories.data.length - 1 !== index ? ', ' : ''}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimeModal
