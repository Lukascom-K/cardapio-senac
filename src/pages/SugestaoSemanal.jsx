import { useContext, useState } from 'react'
import { CardapioContext } from '../context/CardapioContext'
import {
  TIPOS, RESTRICOES_MAP,
  badgeTipo, badgeCaract, labelCaract, labelTipo
} from '../utils/cardapioHelpers'
import './SugestaoSemanal.css'

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
const DIAS_FULL = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira']

const HORARIOS = [
  { key: 'almoco', label: 'Almoço', horario: '11h30 às 14h00' },
]

function getSegundaFeira(dt) {
  const d = new Date(dt)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

function toIso(dt) { return dt.toISOString().slice(0, 10) }

function addDays(dt, n) {
  const d = new Date(dt)
  d.setDate(d.getDate() + n)
  return d
}

function formatarDiaCurto(seg, idx) {
  const d = addDays(seg, idx)
  const [, m, day] = toIso(d).split('-')
  return `${DIAS[idx]}, ${day}/${m}`
}

export default function SugestaoSemanal() {
  const { pratos, cardapioPorData } = useContext(CardapioContext)

  const [semanaOffset, setSemanaOffset] = useState(0)
  const [semanas, setSemanas] = useState({
    0: { nome: 'Semana Padrão', tema: 'Culinária Brasileira' }
  })
  const [editando, setEditando]   = useState(false)
  const [nomeEdit, setNomeEdit]   = useState('')
  const [temaEdit, setTemaEdit]   = useState('')

  const hoje = new Date()
  const seg  = getSegundaFeira(hoje)
  seg.setDate(seg.getDate() + semanaOffset * 7)
  const datasSemanais = DIAS.map((_, i) => toIso(addDays(seg, i)))

  const semanaInfo = semanas[semanaOffset] || {
    nome: `Semana ${semanaOffset >= 0 ? '+' : ''}${semanaOffset}`,
    tema: ''
  }

  const iniciarEdicao = () => {
    setNomeEdit(semanaInfo.nome)
    setTemaEdit(semanaInfo.tema)
    setEditando(true)
  }

  const salvarNome = () => {
    setSemanas(s => ({ ...s, [semanaOffset]: { nome: nomeEdit, tema: temaEdit } }))
    setEditando(false)
  }

  return (
    <div className="page-container ss-container">
      {/* Cabeçalho da semana */}
      <div className="ss-header card" role="region" aria-label="Navegação semanal">
        <div className="ss-header-content">
          <button
            className="btn btn-ghost btn-sm ss-nav-btn"
            onClick={() => setSemanaOffset(o => o - 1)}
            aria-label="Ir para a semana anterior"
          >
            ← <span>Semana anterior</span>
          </button>

          <div className="ss-week-info">
            {editando ? (
              <div className="ss-edit-form" role="form" aria-label="Editar nome e tema da semana">
                <input
                  className="input"
                  value={nomeEdit}
                  onChange={e => setNomeEdit(e.target.value)}
                  placeholder="Nome da semana"
                  style={{ width: 200 }}
                  aria-label="Nome da semana"
                  autoFocus
                />
                <input
                  className="input"
                  value={temaEdit}
                  onChange={e => setTemaEdit(e.target.value)}
                  placeholder="Tema culinário"
                  style={{ width: 200 }}
                  aria-label="Tema culinário"
                />
                <button className="btn btn-primary btn-sm" onClick={salvarNome}>💾 Salvar</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditando(false)}>Cancelar</button>
              </div>
            ) : (
              <>
                <h2 className="ss-week-nome">{semanaInfo.nome}</h2>
                {semanaInfo.tema && (
                  <span className="ss-week-tema" aria-label={`Tema: ${semanaInfo.tema}`}>
                    🍴 {semanaInfo.tema}
                  </span>
                )}
                <button
                  className="ss-edit-btn"
                  onClick={iniciarEdicao}
                  aria-label="Editar nome e tema da semana"
                  title="Editar nome e tema"
                >
                  ✏️
                </button>
              </>
            )}
          </div>

          <button
            className="btn btn-ghost btn-sm ss-nav-btn"
            onClick={() => setSemanaOffset(o => o + 1)}
            aria-label="Ir para a próxima semana"
          >
            <span>Próxima semana</span> →
          </button>
        </div>

        {/* Horários */}
        <div className="ss-horarios" role="list" aria-label="Horários de funcionamento">
          {HORARIOS.map(h => (
            <div key={h.key} className="ss-horario-item" role="listitem">
              <span className="ss-horario-emoji" aria-hidden="true">{h.emoji}</span>
              <span className="ss-horario-label">{h.label}</span>
              <span className="ss-horario-hora"> {h.horario}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grade dos dias */}
      <div className="ss-grade" role="list" aria-label="Cardápio da semana por dia">
        {DIAS.map((dia, diaIdx) => {
          const dataIso      = datasSemanais[diaIdx]
          const info         = cardapioPorData[dataIso] || {}
          const selecionados = info.selecionados || []
          const pratoDoDiaId = info.pratoDoDia || null
          const pratosDia    = pratos.filter(p => selecionados.includes(p.id))
          const isHoje       = toIso(hoje) === dataIso

          return (
            <article
              key={dia}
              className={`ss-dia-card card${isHoje ? ' ss-dia-card--hoje' : ''}`}
              role="listitem"
              aria-label={`${DIAS_FULL[diaIdx]}${isHoje ? ', hoje' : ''}${pratosDia.length === 0 ? ', sem cardápio' : `, ${pratosDia.length} pratos`}`}
            >
              <div className="ss-dia-header">
                <div>
                  <span className={`ss-dia-nome${isHoje ? ' ss-dia-nome--hoje' : ''}`}>
                    {formatarDiaCurto(seg, diaIdx)}
                  </span>
                  {isHoje && (
                    <span className="ss-hoje-badge" aria-label="Dia atual">Hoje</span>
                  )}
                </div>
                {pratosDia.length > 0 && (
                  <span className="ss-dia-count" aria-label={`${pratosDia.length} pratos`}>
                    {pratosDia.length} prato{pratosDia.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {pratosDia.length === 0 ? (
                <p className="ss-dia-vazio" aria-label="Sem cardápio definido para este dia">
                  🚫 Sem cardápio definido
                </p>
              ) : (
                <div className="ss-dia-pratos">
                  {TIPOS.map(tipo => {
                    const lista = pratosDia.filter(p => p.tipo === tipo)
                    if (!lista.length) return null
                    return (
                      <div key={tipo} className="ss-tipo-grupo">
                        <span className={`${badgeTipo(tipo)} ss-tipo-badge`} aria-label={`Tipo: ${tipo}`}>
                          {labelTipo(tipo)}
                        </span>
                        {lista.map(prato => (
                          <div
                            key={prato.id}
                            className={`ss-prato${prato.id === pratoDoDiaId ? ' ss-prato--destaque' : ''}`}
                            aria-label={`${prato.nome}${prato.id === pratoDoDiaId ? ', prato do dia' : ''}`}
                          >
                            <span className="ss-prato-nome">
                              {prato.id === pratoDoDiaId && (
                                <span aria-hidden="true" className="ss-star">⭐</span>
                              )}
                              {prato.nome}
                            </span>
                            {prato.caracteristicas.length > 0 && (
                              <div className="ss-prato-tags" aria-label="Restrições alimentares">
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
                        ))}
                      </div>
                    )
                  })}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
