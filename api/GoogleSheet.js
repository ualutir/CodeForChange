import { DATA_TYPE } from '../util/Constants'


const _GOOGLE_SHEET_ENV_HOME = {
    development: {
        API_KEY: '',
        SHEET_ID: '1zFrrNlJtbfoHAKp4JTptXna_BiB4ZTMBWnu__LCCMrI',
        SHEET_NAME: 'Home',
    },
}

const _GOOGLE_SHEET_ENV_PLAYER = {
    development: {
        API_KEY: '',
        SHEET_ID: '1zFrrNlJtbfoHAKp4JTptXna_BiB4ZTMBWnu__LCCMrI',
        SHEET_NAME: 'Player',
    },
}

const _GOOGLE_SHEET_ENV_SCENARIO = {
    development: {
        API_KEY: '',
        SHEET_ID: '1zFrrNlJtbfoHAKp4JTptXna_BiB4ZTMBWnu__LCCMrI',
        SHEET_NAME: 'Scenario',
    },
}


export const getGoogleSheetUrl = (dataType) => {
    // TO-DO: Add logic here to get the current platform (e.g. development, staging, production, etc)
    const platform = 'development'

    var API_KEY, SHEET_ID, SHEET_NAME
    switch (dataType) {
        case DATA_TYPE.HOME:
            ({ API_KEY, SHEET_ID, SHEET_NAME } = _GOOGLE_SHEET_ENV_HOME[platform])
            break
        case DATA_TYPE.PLAYER:
            ({ API_KEY, SHEET_ID, SHEET_NAME } = _GOOGLE_SHEET_ENV_PLAYER[platform])
            break
        case DATA_TYPE.SCENARIO:  // TO-DO: separate scenario, task, option into 3 different APIs and Google Sheets
            ({ API_KEY, SHEET_ID, SHEET_NAME } = _GOOGLE_SHEET_ENV_SCENARIO[platform])
            break
    }

    return `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`
}

export const loadEnglishGoogleSheetData = () => {
    introData = loadIntroData()
    playerData = loadGoogleSheetJSON(DATA_TYPE.PLAYER)
    scenarioData = loadGoogleSheetJSON(DATA_TYPE.SCENARIO)
    mergeData = mergeGoogleSheetData(introData, playerData, scenarioData)
    return {'test':'122'}
}

export const loadIntroData = () => {
    introData = loadGoogleSheetJSON(DATA_TYPE.HOME)
    console.log(introData)
    // Parse
}

export const loadPlayerData = () => {
    playerData = loadGoogleSheetJSON(DATA_TYPE.PLAYER)
    // Parse
}

export const loadScenarioData = () => {
    scenarioData = loadGoogleSheetJSON(DATA_TYPE.SCENARIO)
    // Parse
}

export const loadGoogleSheetJSON = async (dataType) => {
    try {
        const response = await fetchGoogleSheetData(dataType)
        const json = await response.json()
        console.log(googleSheetJSONParser(json))
        return googleSheetJSONParser(json)
    } catch {
        console.error(error)
    }
}

export const mergeGoogleSheetData = (introData, playerData, scenarioData) => {
    return { ...introData, ...playerData, ...scenarioData }
}
