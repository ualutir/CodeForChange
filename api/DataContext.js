import React, { createContext, useReducer } from 'react';
import { LANGUAGES } from '../util/Constants';

const DataContext = createContext();

const initialState = {
    language: LANGUAGES.EN,
    introduction: '',
    characters: [],
    scenarios: []
};

const setData = (state, data) => {
    const introduction = data?.homepage?.text;
    const characters = data?.players;
    const scenarios = data?.scenarios;
    return { ...state, introduction, characters, scenarios };
}

const loadData = (language, dispatch) => {
    let data = {};
    if (language == LANGUAGES.EN) {
        data = require('../assets/data_en.json');
    } else if (language == LANGUAGES.ID) {
        data = require('../assets/data_id.json');
    }
    dispatch({ type: 'SET_DATA', data: data });
}

const reducer = (state, action) => {
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

export { DataContext, DataProvider, loadData };
