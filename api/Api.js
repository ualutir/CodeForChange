import { getGoogleSheetUrl } from './GoogleSheet'


export const fetchGoogleSheetData = (dataType) => {
    const url = getGoogleSheetUrl(dataType)
    return fetch(url)
}
