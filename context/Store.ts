import React, { createContext, useReducer} from 'react';
import { reducer } from "./Reducer";

const initialState = {
    provider: null,
    contracts: []
};

export const Store:any = createContext(initialState);

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // @ts-ignore
    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};