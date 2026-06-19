import { createContext, useState, useEffect } from 'react'

export const CardapioContext = createContext()

export function CardapioProvider({ children }) {
    const [pratos, setPratos] = useState([])
    const [cardapioPorData, setCardapioPorData] = useState({})
    const [carregou, setCarregou] = useState(false)

    useEffect(() => {
        const pratosGuardados = localStorage.getItem('pratos')
        const cardapioGuardado = localStorage.getItem('cardapioPorData')
        if (pratosGuardados) setPratos(JSON.parse(pratosGuardados))
        if (cardapioGuardado) setCardapioPorData(JSON.parse(cardapioGuardado))
        setCarregou(true)
    }, [])

    useEffect(() => {
        if (!carregou) return
        localStorage.setItem('pratos', JSON.stringify(pratos))
        localStorage.setItem('cardapioPorData', JSON.stringify(cardapioPorData))
    }, [pratos, cardapioPorData, carregou])

    return (
        <CardapioContext.Provider value={{ pratos, setPratos, cardapioPorData, setCardapioPorData }}>
            {children}
        </CardapioContext.Provider>
    )
}