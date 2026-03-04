import IViewedAnime from './IViewedAnime'

export interface IDecodedToken {
    email: string,
    id: number
}

export interface IDecodedUserInfo {
    id: number,
    nickname: null | string,
    avatar: null | string,
    animeList: IViewedAnime[],
    userId: number,
}
