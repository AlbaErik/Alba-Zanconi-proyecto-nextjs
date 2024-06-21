"use client";
import { createContext, useContext, useState } from "react";

export type ProductoEnCarrito = {
    id: string
    name: string
    description: string
    price: number
    image_url: string
    category_name: string
    quantity: number
  };

const AppContext = createContext<any>(undefined);

export function AppWrapper({children} : {children: React.ReactNode}){
    let [state,setState] = useState<ProductoEnCarrito[]>([]);
    let [disabled, setDisabled] = useState<boolean>(false);
    return (
        <AppContext.Provider value={{state,setState,disabled,setDisabled}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
}