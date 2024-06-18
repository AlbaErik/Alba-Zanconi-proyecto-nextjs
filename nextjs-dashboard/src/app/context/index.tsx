"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext([]);

export function AppWrapper({children} : {children: React.ReactNode}){
    let [state,setState] = useState([])

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
}