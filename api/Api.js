import { getGoogleSheetUrl } from './GoogleSheetConfig'


export const fetchGoogleSheetData = (dataType) => {
    const url = getGoogleSheetUrl(dataType)
    return fetch(url)
};
