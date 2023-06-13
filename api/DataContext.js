import React, { createContext, useReducer } from 'react';
import { LANGUAGES } from '../util/Constants';
import { loadEnglishGoogleSheetData } from './GoogleSheet';

const scenarioImages = {
    'Scenario-1': require("../assets/scenario_bg/scenario-1.gif"),
    'Scenario-2': require("../assets/scenario_bg/scenario-2.gif"),
    'Scenario-3': require("../assets/scenario_bg/scenario-3.gif"),
    'Scenario-4': require("../assets/scenario_bg/scenario-4.gif"),
    'Scenario-5': require("../assets/scenario_bg/scenario-5.gif"),
}

const PLAYER_IMAGES = {
    'Benjie': require("../assets/characters/Benjie.gif"),
    'Gelo': require("../assets/characters/Gelo.gif"),
    'Ethel': require("../assets/characters/Ethel.gif"),
    'Budi': require("../assets/characters/Budi.gif"),
    'Kiko': require("../assets/characters/Kiko.gif"),
    'Asep': require("../assets/characters/Asep.gif"),
    'Rini': require("../assets/characters/Rini.gif"),
    'Lina': require("../assets/characters/Lina.gif"),
    'Dewi': require("../assets/characters/Dewi.gif"),
    'Abdul': require("../assets/characters/Abdul.gif")
}

const PLAYER_PROFILES = {
    'Benjie': require("../assets/characters/Benjie_avatar.png"),
    'Gelo': require("../assets/characters/Gelo_avatar.png"),
    'Ethel': require("../assets/characters/Ethel_avatar.png"),
    'Budi': require("../assets/characters/Budi_avatar.png"),
    'Kiko': require("../assets/characters/Kiko_avatar.png"),
    'Asep': require("../assets/characters/Asep_avatar.png"),
    'Rini': require("../assets/characters/Rini_avatar.png"),
    'Lina': require("../assets/characters/Lina_avatar.png"),
    'Dewi': require("../assets/characters/Dewi_avatar.png"),
    'Abdul': require("../assets/characters/Abdul_avatar.png")
}

const DataContext = createContext();

const initialState = {
    language: LANGUAGES.EN,
    introduction: '',
    captions: {},
    characters: [],
    scenarios: [],
    character: null,
    avatar: null,
    scenario: null,
    scenarioImage: null,
    task: null,
    option: null,
    options: {}
};

const setData = (state, data) => {
    const introduction = data?.homepage?.text;
    const characters = data?.players;
    const scenarios = data?.scenarios;
    const scenario = null;
    const captions = data?.captions;
    return { ...state, introduction, characters, scenarios, captions, scenario };
}

const loadData = (language, dispatch) => {
    let data = {};
    if (language == LANGUAGES.EN) {
        data = require('../assets/data/data_en.json');
    } else if (language == LANGUAGES.ID) {
        data = require('../assets/data/data_id.json');
    }
    dispatch({ type: 'SET_DATA', data: data });
}

const loadGoogleSheetData = (language, dispatch) => {
    if (language == LANGUAGES.EN) {
        loadEnglishGoogleSheetData()
            .then(data => {
                dispatch({ type: 'SET_DATA', data: data });
            })
    } else if (language == LANGUAGES.ID) {
        console.log("Not Implemented")
    }
}

const reducer = (state, action) => {
    let options = null;
    switch (action.type) {
        case 'SET_LANGUAGE':
            return { ...state, language: action.data };
        case 'SET_INTRODUCTION':
            return { ...state, introduction: action.data };
        case 'SET_CHARACTERS':
            return { ...state, characters: action.data };
        case 'SET_SCENARIOS':
            return { ...state, scenarios: action.data };
        case 'SET_DATA':
            return setData(state, action.data);
        case 'SET_CHARACTER':
            return { ...state, character: action.data, avatar: PLAYER_PROFILES[action.data] };
        case 'SET_SCENARIO':
            let scenario = action.data;
            options = Object.assign({}, state.options);
            options[scenario.id] = {};
            return { ...state, scenario: scenario, scenarioImage: scenarioImages['Scenario-' + scenario.id], task: scenario.tasks[0], option: null, options: options };
        case 'SET_TASK':
            let task = action.data;
            options = Object.assign({}, state.options);
            options[state.scenario.id][task.id] = {};
            return { ...state, task: task, option: null, options: options };
        case 'SET_OPTION':
            let option = action.data;
            options = Object.assign({}, state.options);
            options[state.scenario.id][state.task.id] = option.id;
            return { ...state, option: option, options: options }
        default:
            return state;
    }
};


const useData = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // TODO
    // useEffect(() => {
    //     const fetchData = async () => {           
    //         const data = await response.json();
    //         dispatch({ type: 'SET_DATA', data: data });
    //     };
    //     fetchData();
    // }, [state.language]);

    return { state, dispatch };
};

const DataProvider = ({ children }) => {
    const data = useData();

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};



export {
    DataContext,
    DataProvider,
    loadData,
    loadGoogleSheetData,
    scenarioImages,
    PLAYER_IMAGES,
};
