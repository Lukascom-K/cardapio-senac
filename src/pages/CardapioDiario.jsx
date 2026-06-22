import { useContext, useState } from 'react'
import { CardapioContext } from '../context/CardapioContext'
import {
  TIPOS, RESTRICOES_MAP,
  badgeTipo, badgeCaract, labelCaract, labelTipo, formatarData
} from '../utils/cardapioHelpers'
import './CardapioDiario.css'

export default function CardapioDiario() {
  const { pratos, cardapioPorData } = useContext(CardapioContext)
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10))

  const info           = cardapioPorData[data] || {}
  const selecionadosIds = info.selecionados || []
  const pratoDoDiaId   = info.pratoDoDia || null

  const pratosDoDia = pratos.filter(p => selecionadosIds.includes(p.id))
  const pratoDoDia  = pratos.find(p => p.id === pratoDoDiaId)

  return (
    <div className="page-container">
      {/* Topo */}
      <div className="cd-topbar">
        <div>
          <h2 className="section-title" style={{ marginBottom: 4 }}> Cardápio Diário</h2>
          <p className="cd-date-label" aria-live="polite">{formatarData(data)}</p>
        </div>
        <div className="form-group cd-date-picker">
          <label className="form-label" htmlFor="cd-date">Data</label>
          <input
            id="cd-date"
            type="date"
            className="input"
            style={{ width: 188 }}
            value={data}
            onChange={e => setData(e.target.value)}
            aria-label="Selecionar data do cardápio"
          />
        </div>
      </div>

      {/* Hero — Prato do Dia */}
      {pratoDoDia && (
        <div className="cd-hero card" role="region" aria-label="Prato do dia em destaque">
          <div className="cd-hero-eyebrow">
            <span className="cd-hero-badge" aria-label="Destaque: prato do dia">⭐ Prato do Dia</span>
          </div>
          <div className="cd-hero-body">
            <div className="cd-hero-text">
              <h3 className="cd-hero-nome">{pratoDoDia.nome}</h3>
              <div className="cd-hero-tags" aria-label="Categoria e restrições">
                <span className="cd-hero-tipo-badge" aria-label={`Tipo: ${pratoDoDia.tipo}`}>
                  {labelTipo(pratoDoDia.tipo)}
                </span>
                {pratoDoDia.caracteristicas.map(c => (
                  <span
                    key={c}
                    className="cd-hero-caract-badge"
                    title={RESTRICOES_MAP[c]?.ariaLabel}
                    aria-label={RESTRICOES_MAP[c]?.ariaLabel}
                  >
                    {labelCaract(c)}
                  </span>
                ))}
              </div>
            </div>
            {pratoDoDia.preco && (
              <div className="cd-hero-preco" aria-label={`Preço: R$ ${Number(pratoDoDia.preco).toFixed(2)}`}>
                R$ {Number(pratoDoDia.preco).toFixed(2)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Estado vazio */}
      {pratosDoDia.length === 0 && (
        <div className="empty-state card" style={{ marginTop: 24 }} role="status">
          <p style={{ fontSize: 48, marginBottom: 10 }}>🍽️</p>
          <p>Nenhum prato selecionado para esta data.</p>
          <p style={{ fontSize: 14, marginTop: 8, color: 'var(--color-text-light)' }}>
            Acesse <strong>Seleção de Pratos</strong> para montar o cardápio do dia.
          </p>
        </div>
      )}

      {/* Seções por tipo */}
      {pratosDoDia.length > 0 && (
        <div className="cd-sections">
          {TIPOS.map(tipo => {
            const lista = pratosDoDia.filter(p => p.tipo === tipo)
            if (!lista.length) return null
            return (
              <section key={tipo} className="cd-section card" aria-label={`Seção: ${tipo}`}>
                <div className="cd-section-header">
                  <span className={badgeTipo(tipo)} aria-hidden="true">{labelTipo(tipo)}</span>
                  <span className="cd-section-count">
                    {lista.length} prato{lista.length > 1 ? 's' : ''}
                  </span>
                </div>
                <ul className="cd-prato-list" role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {lista.map(prato => (
                    <li
                      key={prato.id}
                      className={`cd-prato-item${prato.id === pratoDoDiaId ? ' cd-prato-item--destaque' : ''}`}
                      aria-label={`${prato.nome}${prato.id === pratoDoDiaId ? ', prato do dia' : ''}`}
                    >
                      <div className="cd-prato-info">
                        <div className="cd-prato-nome-row">
                          <span className="cd-prato-nome">{prato.nome}</span>
                          {prato.id === pratoDoDiaId && (
                            <span className="cd-prato-star" aria-label="Prato do dia">⭐</span>
                          )}
                        </div>
                        {prato.caracteristicas.length > 0 && (
                          <div className="cd-prato-tags" aria-label="Restrições alimentares">
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
                        <span
                          className="cd-prato-preco"
                          aria-label={`R$ ${Number(prato.preco).toFixed(2)}`}
                        >
                          R$ {Number(prato.preco).toFixed(2)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
