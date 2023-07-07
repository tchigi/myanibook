import { IAnime } from './IAnime'
import IAnimeDateOfAdditionList from './IAnimeDateOfAdditionList'

export interface IDecodedToken {
    email: string,
    id: number
}

export interface IDecodedUserInfo {
    id: number,
    nickname: null | string,
    avatar: null | string,
    animeList: null | IAnime,
    animeDayOfAdditionList: null | IAnimeDateOfAdditionList,
}
