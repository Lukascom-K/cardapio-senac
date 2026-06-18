import { useContext, useState } from "react"
import { CardapioContext } from "../context/CardapioContext"

export default function Selecao() {
  const { pratos, cardapioPorData, setCardapioPorData } = useContext(CardapioContext)
  const [data, setData] = useState('')

  return (
    <div>
      <h2>Seleção de Porções</h2>
      <input
        type="date"
        value={data}
        onChange={e => setData(e.target.value)}
      />

    {data && pratos.length === 0 && (
    <p>Nenhum prato cadastrado. Vá para Cadastro primeiro.</p>
    )}

    {data && pratos.length > 0 && (
    <div>
        {pratos.map(prato => {
            const selecionados = cardapioPorData[data]?.selecionados || []
            const estaSelecionado = selecionados.includes(prato.id)

            return (
                <div key={prato.id}>
                <input
                    type="checkbox"
                    checked={estaSelecionado}
                    onChange={() => {
                    const novosSelecionados = estaSelecionado
                        ? selecionados.filter(id => id !== prato.id)
                        : [...selecionados, prato.id]
                    setCardapioPorData({
                        ...cardapioPorData,
                        [data]: { ...cardapioPorData[data], selecionados: novosSelecionados }
                    })
                    }}
                />
                <span>{prato.nome}</span>
                <span>{prato.tipo}</span>
                </div>
            )
        })}
    </div>
    )}      
      
    </div>
  )
} 
