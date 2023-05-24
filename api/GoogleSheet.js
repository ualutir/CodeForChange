import { DATA_TYPE, LANGUAGES } from '../util/Constants'
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
    let introData = await loadIntroData(LANGUAGES.EN)
    let playerData = await loadPlayerData(LANGUAGES.EN)
    let scenarioData = await loadScenarioData(LANGUAGES.EN)
    let mergeData = mergeGoogleSheetData(introData, playerData, scenarioData)
    return mergeData
}

export const loadIntroData = async (language) => {
    return loadGoogleSheetJSON(DATA_TYPE.HOME)
    .then((data) => {
        let parsedData = googleSheetJSONParser(data)
        let introDataByLanguage = parsedData.filter(intro => intro.language == language)
        // Use the first intro text in Excel for selected language
        let introText = introDataByLanguage.length > 0 ? introDataByLanguage[0].text : "Welcome to Change for Green!" 
        let introObj = {"homepage": {"text": introText}}
        return introObj
    })
}

export const loadPlayerData = async (language) => {
    return loadGoogleSheetJSON(DATA_TYPE.PLAYER)
    .then((data) => {
        let parsedData = googleSheetJSONParser(data)
        let playerDataByLanguage = parsedData.filter(player => player.language == language)
        let filteredPlayerData = playerDataByLanguage.map(player => (
            {id: player.id, name: player.name, desc:player.desc}
        ))
        let playerObj = {"players": filteredPlayerData}
        return playerObj
    })
}

export const loadScenarioData = async (language) => {
    return loadGoogleSheetJSON(DATA_TYPE.SCENARIO)
    .then((data) => {
        let parsedData = googleSheetJSONParser(data)
        parsedScenarioIds = []
        scenarios = []
        for (let i = 0; i < parsedData.length; i++) {
            let row = parsedData[i]
            if (!parsedScenarioIds.includes(row.id)) {
                // If no scenario, add the scenario for the first time
                parsedScenarioIds.push(row.id)
                let scenarioObj = ({
                    id: row.id, 
                    name: row.name, 
                    desc: row.desc,
                    backgroundColor: "rgba(0,255,150,0.2)",
                    backgroundImage: `../assets/scenario-${row.id}.gif`,
                    tasks: []
                })
                scenarios.push(scenarioObj)
            }
            // Add task for the corresponding scenario
            let scenarioIndex = parsedScenarioIds.indexOf(row.id)
            let optionObj = ({
                id: row.option_id,
                title: row.option_title,
                desc: row.option_desc,
                feedback: row.option_feedback
            })
            pushOption = false
            for (let j = 0; j < scenarios[scenarioIndex].tasks.length; j++) {
                // If the task exists, only option is added
                if (scenarios[scenarioIndex].tasks[j].id == row.task_id) {
                    scenarios[scenarioIndex].tasks[j].options.push(optionObj)
                    pushOption = true
                    break
                }
            }
            if (!pushOption) {
                // If the task does not exist, add the task with the option
                let taskObj = ({
                    id: row.task_id,
                    desc: row.task_desc,
                    options: [optionObj]
                })
                scenarios[scenarioIndex].tasks.push(taskObj)
            }
        }

        let scenarioObj = {"scenarios": scenarios}
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
