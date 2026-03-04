import { AnimeData } from './IAnime'

export default interface IViewedAnime {
    id: string
    addedAt: string
}

export interface IViewedAnimeList extends AnimeData {
    addedAt: string
}
