import { getGoogleSheetUrl } from './GoogleSheetConfig'
import { DATA_TYPE } from '../util/Constants'


export const fetchGoogleSheetEnglishPlayer = () => {
    const url = getGoogleSheetUrl(DATA_TYPE.PLAYER)
    return fetch(url)
};
