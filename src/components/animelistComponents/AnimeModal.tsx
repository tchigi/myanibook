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
                <figure className="anime__card__modal__img__wrapper">
                    <img src={selectedAnime.attributes.posterImage.original} className={'anime__card__modal__img'} alt="" />
                </figure>
                <div className="anime__card__modal__description">
                    <div className="anime__card__modal__title">{selectedAnime.attributes.canonicalTitle}</div>
                    <div className="anime__card_model__info__block">
                        <div>{selectedAnime.attributes.showType}</div>
                        <div>{releaseDateMorph}</div>
                        <div className="anime__card__modal__rating">
                            Rating: <span>{selectedAnime.attributes.averageRating}</span>
                        </div>
                    </div>

                    <div className={'anime-card-modal-synopsis'}>{selectedAnime.attributes.description}</div>

                    <div className="anime-card-modal-genres-wrapper">
                        Genres:
                        {genres.data.map((item) => {
                            return <span key={item.id}>{item.attributes.name}</span>
                        })}
                    </div>

                    <div className="anime-card-modal-categories-wrapper">
                        Categories:
                        {categories.data.map((item) => {
                            return <span key={item.id}>{item.attributes.title}</span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimeModal
