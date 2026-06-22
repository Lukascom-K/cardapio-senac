import { useContext, useState } from 'react'
import { CardapioContext } from '../context/CardapioContext'
import {
  TIPOS, RESTRICOES_MAP,
  badgeTipo, badgeCaract, labelCaract, labelTipo
} from '../utils/cardapioHelpers'
import './Selecao.css'

export default function Selecao() {
  const { pratos, cardapioPorData, setCardapioPorData } = useContext(CardapioContext)
  const [data, setData] = useState('')

  const info         = cardapioPorData[data] || {}
  const selecionados = info.selecionados || []
  const pratoDoDiaId = info.pratoDoDia || null

  const togglePrato = (prato) => {
    const esta = selecionados.includes(prato.id)
    const novos = esta
      ? selecionados.filter(id => id !== prato.id)
      : [...selecionados, prato.id]
    setCardapioPorData({ ...cardapioPorData, [data]: { ...info, selecionados: novos } })
  }

  const setPratoDoDia = (id) => {
    setCardapioPorData({
      ...cardapioPorData,
      [data]: { ...info, pratoDoDia: pratoDoDiaId === id ? null : id }
    })
  }

  return (
    <div className="page-container">
      <div className="sel-topbar">
        <h2 className="section-title" style={{ marginBottom: 0 }}>✅ Seleção de Pratos</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="sel-date">Data do cardápio</label>
          <input
            id="sel-date"
            type="date"
            className="input"
            style={{ width: 200 }}
            value={data}
            onChange={e => setData(e.target.value)}
            aria-describedby="sel-date-hint"
          />
          <span id="sel-date-hint" className="sr-only">Selecione uma data para ver os pratos disponíveis</span>
        </div>
      </div>

      {!data && (
        <div className="empty-state card" style={{ marginTop: 16 }} role="status">
          <p style={{ fontSize: 36, marginBottom: 10 }}>📅</p>
          <p>Selecione uma data para montar o cardápio do dia.</p>
        </div>
      )}

      {data && pratos.length === 0 && (
        <div className="empty-state card" style={{ marginTop: 16 }} role="status">
          <p style={{ fontSize: 36, marginBottom: 10 }}>🍽️</p>
          <p>Nenhum prato cadastrado.</p>
          <p style={{ fontSize: 14, marginTop: 8, color: 'var(--color-text-light)' }}>
            Acesse <strong>Cadastro</strong> para adicionar pratos ao sistema.
          </p>
        </div>
      )}

      {data && pratos.length > 0 && (
        <>
          <div className="sel-resumo" role="status" aria-live="polite">
            <span className="sel-resumo-info">
              <strong>{selecionados.length}</strong> prato{selecionados.length !== 1 ? 's' : ''} selecionado{selecionados.length !== 1 ? 's' : ''}
            </span>
            {pratoDoDiaId && (
              <span className="sel-resumo-destaque" aria-label="Prato do dia definido">
                ⭐ Prato do dia definido
              </span>
            )}
          </div>

          <div className="sel-sections">
            {TIPOS.map(tipo => {
              const lista = pratos.filter(p => p.tipo === tipo)
              if (!lista.length) return null
              const qtdSel = lista.filter(p => selecionados.includes(p.id)).length

              return (
                <section key={tipo} className="card sel-section" aria-label={`Seção: ${tipo}`}>
                  <div className="sel-section-header">
                    <span className={badgeTipo(tipo)} aria-hidden="true">{labelTipo(tipo)}</span>
                    <span className="sel-section-count" aria-live="polite">
                      {qtdSel} de {lista.length} selecionado{qtdSel !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="sel-prato-list" role="list">
                    {lista.map(prato => {
                      const sel        = selecionados.includes(prato.id)
                      const isDestaque = pratoDoDiaId === prato.id

                      return (
                        <div
                          key={prato.id}
                          className={`sel-prato-row${sel ? ' sel-prato-row--sel' : ''}${isDestaque ? ' sel-prato-row--destaque' : ''}`}
                          onClick={() => togglePrato(prato)}
                          role="listitem"
                          aria-label={`${prato.nome}${sel ? ', selecionado' : ', não selecionado'}${isDestaque ? ', prato do dia' : ''}`}
                        >
                          {/* Checkbox visual customizado */}
                          <div className="sel-check-area" aria-hidden="true">
                            <div className={`sel-checkbox${sel ? ' sel-checkbox--on' : ''}`}>
                              {sel && (
                                <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                                  <path d="M1 4.5l3.2 3.2 5.8-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                          </div>

                          <div className="sel-prato-info">
                            <span className="sel-prato-nome">{prato.nome}</span>
                            {prato.caracteristicas.length > 0 && (
                              <div className="sel-prato-tags" aria-label="Restrições alimentares">
                                {prato.caracteristicas.map(c => (
                                  <span
                                    key={c}
                                    className={badgeCaract(c)}
                                    title={RESTRICOES_MAP[c]?.ariaLabel}
                                  >
                                    {labelCaract(c)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {prato.preco && (
                            <span className="sel-prato-preco" aria-label={`R$ ${Number(prato.preco).toFixed(2)}`}>
                              R$ {Number(prato.preco).toFixed(2)}
                            </span>
                          )}

                          {sel && (
                            <button
                              className={`sel-star-btn${isDestaque ? ' sel-star-btn--on' : ''}`}
                              aria-label={isDestaque ? `Remover ${prato.nome} como prato do dia` : `Definir ${prato.nome} como prato do dia`}
                              aria-pressed={isDestaque}
                              onClick={e => { e.stopPropagation(); setPratoDoDia(prato.id) }}
                            >
                              {isDestaque ? '⭐' : '☆'}
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
