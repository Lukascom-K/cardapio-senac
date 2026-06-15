import { createContext, useState, useEffect } from 'react'

export const CardapioContext = createContext()

export function CardapioProvider({ children}) {
    const [pratos, setPratos] = useState([])
    const [cardapioPorData, setCardapioPorData] = useState({})

    return (
        <CardapioContext.Provider value={{ pratos, setPratos, cardapioPorData, setCardapioPorData}}>
            {children}
        </CardapioContext.Provider>
    )
}