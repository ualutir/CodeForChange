import { DATA_TYPE } from '../util/Constants'
import { googleSheetJSONParser } from '../util/Helper'
import { fetchData } from './Api'


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

export const loadEnglishGoogleSheetData = async () => {
    let introData = await loadIntroData()
    let playerData = await loadPlayerData()
    let scenarioData = await loadScenarioData()
    let mergeData = mergeGoogleSheetData(introData, playerData, scenarioData)
    return mergeData
}

export const loadIntroData = async () => {
    return loadGoogleSheetJSON(DATA_TYPE.HOME)
    .then((data) => {
        let parsedData = googleSheetJSONParser(data)
        let introData = parsedData.filter(player => player.language == "English")
        // Use the first intro text in Excel for selected language
        let introText = introData.length > 0 ? introData[0].text : "Welcome to Change for Green!" 
        let introObj = {"homepage": {"text": introText}}
        return introObj
    })
}

export const loadPlayerData = async () => {
    return loadGoogleSheetJSON(DATA_TYPE.PLAYER)
    .then((data) => {
        let parsedData = googleSheetJSONParser(data)
        // Parse and replace the array below
        let playerData = [
            {
                "id": "1",
                "test": "testPlayer"
            },
            {
                "id": "2"
            }
        ]
        let playerObj = {"players": playerData}
        return playerObj
    })
}

export const loadScenarioData = async () => {
    return loadGoogleSheetJSON(DATA_TYPE.SCENARIO)
    .then((data) => {
        let parsedData = googleSheetJSONParser(data)
        // Parse and replace the array below
        let scenarioData = [
            {
                "id": 1,
                "name": "Scenario 1",
                "tasks": [
                  {
                    "id": 1,
                    "desc": "Learning ncome?",
                    "options": [
                      {
                        "id": 1,
                      },
                      {
                        "id": 2,
                        "title": "Treating food waste with black soldier fly",
                      }
                    ]
                  },
                  {
                    "id": 2
                  },
                ]
            }
        ]
        let scenarioObj = {"scenarios": scenarioData}
        return scenarioObj
    })
}

export const loadGoogleSheetJSON = async (dataType) => {
    try {
        const response = await fetchData(getGoogleSheetUrl(dataType))
        const json = await response.json()
        return json
    } catch {
        console.error(`loadGoogleSheetJSON() ${error}`)
    }
}

export const mergeGoogleSheetData = (introData, playerData, scenarioData) => {
    let mergedData = { ...introData, ...playerData, ...scenarioData }
    return mergedData
}
