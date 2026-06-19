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

    {data && (
      <p>Selecionados: {cardapioPorData[data]?.selecionados?.length || 0}</p>
    )}

    {data && pratos.length === 0 && (
    <p>Nenhum prato cadastrado. Vá para Cadastro primeiro.</p>
    )}

    {data && pratos.length > 0 && (
    <div>
        {['Entrada', 'Principal', 'Sobremesa'].map(tipo => (
          <div key={tipo}>
            <h3>{tipo}</h3>
            {pratos.filter(p => p.tipo === tipo).map(prato => {
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

                  <button onClick={() => {
                    setCardapioPorData({
                      ...cardapioPorData,
                      [data]: { ...cardapioPorData[data], pratoDoDia: prato.id }
                    })
                  }}>
                    {cardapioPorData[data]?.pratoDoDia === prato.id ? '⭐' : '☆'}
                  </button>

                </div>
              )
            })}
          </div>
        ))}
    </div>
    )}      
      
    </div>
  )
} 
