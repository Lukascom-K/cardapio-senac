import { createContext, useState, useEffect } from 'react'

export const CardapioContext = createContext()

export function CardapioProvider({ children}) {
    const [pratos, setPratos] = useState([])
    const [cardapioPorData, setCardapioPorData] = useState({})

    useEffect(() => {
    const pratosGuardados = localStorage.getItem('pratos')
    const cardapioGuardado = localStorage.getItem('cardapioPorData')
    if (pratosGuardados) setPratos(JSON.parse(pratosGuardados))
    if (cardapioGuardado) setCardapioPorData(JSON.parse(cardapioGuardado))
    }, [])

    useEffect(() => {
    localStorage.setItem('pratos', JSON.stringify(pratos))
    localStorage.setItem('cardapioPorData', JSON.stringify(cardapioPorData))
    }, [pratos, cardapioPorData])


    return (
        <CardapioContext.Provider value={{ pratos, setPratos, cardapioPorData, setCardapioPorData}}>
            {children}
        </CardapioContext.Provider>
    )
}