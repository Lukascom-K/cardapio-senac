import { useContext, useState } from 'react'
import { CardapioContext } from '../context/CardapioContext'
import {
  TIPOS, RESTRICOES, RESTRICOES_KEYS,
  badgeTipo, badgeCaract, labelCaract, labelTipo
} from '../utils/cardapioHelpers'
import './Cadastro.css'

export default function Cadastro() {
  const { pratos, setPratos } = useContext(CardapioContext)
  const [form, setForm]         = useState({ nome: '', preco: '', tipo: 'Principal', caracteristicas: [] })
  const [editandoId, setEditandoId] = useState(null)
  const [filtroTipo, setFiltroTipo] = useState('Todos')

  const total      = pratos.length
  const principais = pratos.filter(p => p.tipo === 'Principal').length
  const veganos    = pratos.filter(p => p.caracteristicas.includes('Vegano')).length

  const toggleCaract = (key) => {
    const lista = form.caracteristicas.includes(key)
      ? form.caracteristicas.filter(x => x !== key)
      : [...form.caracteristicas, key]
    setForm({ ...form, caracteristicas: lista })
  }

  const salvar = () => {
    if (!form.nome.trim()) return
    if (editandoId !== null) {
      setPratos(pratos.map(p => p.id === editandoId ? { ...form, id: editandoId } : p))
      setEditandoId(null)
    } else {
      setPratos([...pratos, { ...form, id: Date.now() }])
    }
    setForm({ nome: '', preco: '', tipo: 'Principal', caracteristicas: [] })
  }

  const editar = (prato) => {
    setEditandoId(prato.id)
    setForm({ nome: prato.nome, preco: prato.preco, tipo: prato.tipo, caracteristicas: prato.caracteristicas })
    document.getElementById('cad-nome')?.focus()
  }

  const cancelar = () => {
    setEditandoId(null)
    setForm({ nome: '', preco: '', tipo: 'Principal', caracteristicas: [] })
  }

  const pratosFiltrados = filtroTipo === 'Todos'
    ? pratos
    : pratos.filter(p => p.tipo === filtroTipo)

  return (
    <div className="page-container">
      <h2 className="section-title">📝 Cadastro de Pratos</h2>

      {/* Estatísticas */}
      <div className="cad-stats" role="region" aria-label="Resumo dos pratos cadastrados">
        <div className="cad-stat-item">
          <span className="cad-stat-valor" aria-label={`${total} pratos no total`}>{total}</span>
          <span className="cad-stat-label">Total de pratos</span>
        </div>
        <div className="cad-stat-divider" aria-hidden="true"/>
        <div className="cad-stat-item">
          <span className="cad-stat-valor" aria-label={`${principais} pratos principais`}>{principais}</span>
          <span className="cad-stat-label">🍽️ Principais</span>
        </div>
        <div className="cad-stat-divider" aria-hidden="true"/>
        <div className="cad-stat-item">
          <span className="cad-stat-valor" aria-label={`${veganos} pratos veganos`}>{veganos}</span>
          <span className="cad-stat-label">🌱 Veganos</span>
        </div>
      </div>

      {/* Formulário */}
      <section className="card cad-form-card" aria-label={editandoId !== null ? 'Editar prato' : 'Cadastrar novo prato'}>
        <div className="cad-form-title" aria-live="polite">
          {editandoId !== null ? '✏️ Editando prato' : '➕ Novo prato'}
        </div>

        <div className="cad-form-grid">
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" htmlFor="cad-nome">Nome do prato</label>
            <input
              id="cad-nome"
              className="input"
              placeholder="Ex: Frango grelhado com legumes"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && salvar()}
              aria-required="true"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cad-preco">Preço (R$)</label>
            <input
              id="cad-preco"
              className="input"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={form.preco}
              onChange={e => setForm({ ...form, preco: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="cad-tipo">Tipo</label>
            <select
              id="cad-tipo"
              className="select"
              value={form.tipo}
              onChange={e => setForm({ ...form, tipo: e.target.value })}
            >
              {TIPOS.map(t => <option key={t} value={t}>{labelTipo(t)}</option>)}
            </select>
          </div>
        </div>

        {/* Restrições alimentares */}
        <fieldset className="cad-caract-fieldset">
          <legend className="form-label">Restrições alimentares</legend>
          <div className="cad-caract-list" role="group">
            {RESTRICOES.map(r => (
              <label
                key={r.key}
                className={`cad-caract-chip${form.caracteristicas.includes(r.key) ? ' cad-caract-chip--on' : ''}`}
                title={r.ariaLabel}
              >
                <input
                  type="checkbox"
                  checked={form.caracteristicas.includes(r.key)}
                  onChange={() => toggleCaract(r.key)}
                  className="sr-only"
                  aria-label={r.ariaLabel}
                />
                <span aria-hidden="true">{r.emoji}</span>
                {r.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="cad-form-actions">
          {editandoId !== null && (
            <button className="btn btn-ghost" onClick={cancelar}>Cancelar</button>
          )}
          <button
            className="btn btn-primary"
            onClick={salvar}
            disabled={!form.nome.trim()}
            aria-label={editandoId !== null ? 'Salvar alterações do prato' : 'Cadastrar novo prato'}
          >
            {editandoId !== null ? '💾 Salvar alterações' : '✅ Cadastrar prato'}
          </button>
        </div>
      </section>

      {/* Lista */}
      {pratos.length > 0 && (
        <section className="cad-lista-section" aria-label="Pratos cadastrados">
          <div className="cad-lista-top">
            <h3 className="cad-lista-titulo">Pratos cadastrados</h3>
            <div className="cad-filtro" role="group" aria-label="Filtrar por tipo">
              {['Todos', ...TIPOS].map(t => (
                <button
                  key={t}
                  className={`cad-filtro-btn${filtroTipo === t ? ' cad-filtro-btn--ativo' : ''}`}
                  onClick={() => setFiltroTipo(t)}
                  aria-pressed={filtroTipo === t}
                >
                  {t === 'Todos' ? '🍴 Todos' : labelTipo(t)}
                </button>
              ))}
            </div>
          </div>

          <div className="card cad-lista-card" role="list">
            {pratosFiltrados.length === 0 ? (
              <p className="cad-lista-vazio" role="status">Nenhum prato deste tipo.</p>
            ) : (
              pratosFiltrados.map((prato, idx) => (
                <article
                  key={prato.id}
                  className={`cad-prato-row${idx === pratosFiltrados.length - 1 ? ' cad-prato-row--last' : ''}`}
                  role="listitem"
                  aria-label={`Prato: ${prato.nome}`}
                >
                  <div className="cad-prato-info">
                    <span className="cad-prato-nome">{prato.nome}</span>
                    <div className="cad-prato-tags" aria-label="Categoria e restrições">
                      <span className={badgeTipo(prato.tipo)} aria-label={`Tipo: ${prato.tipo}`}>
                        {labelTipo(prato.tipo)}
                      </span>
                      {prato.caracteristicas.map(c => (
                        <span
                          key={c}
                          className={badgeCaract(c)}
                          title={RESTRICOES.find(r => r.key === c)?.ariaLabel}
                        >
                          {labelCaract(c)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="cad-prato-meta">
                    {prato.preco && (
                      <span className="cad-prato-preco" aria-label={`Preço: R$ ${Number(prato.preco).toFixed(2)}`}>
                        R$ {Number(prato.preco).toFixed(2)}
                      </span>
                    )}
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => editar(prato)}
                      aria-label={`Editar prato ${prato.nome}`}
                    >✏️ Editar</button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm(`Excluir "${prato.nome}"?`))
                          setPratos(pratos.filter(p => p.id !== prato.id))
                      }}
                      aria-label={`Excluir prato ${prato.nome}`}
                    >🗑️ Excluir</button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      )}

      {pratos.length === 0 && (
        <div className="empty-state" role="status">
          <p style={{ fontSize: 40, marginBottom: 12 }}>🍽️</p>
          <p>Nenhum prato cadastrado ainda.</p>
          <p style={{ fontSize: 14, marginTop: 8, color: 'var(--color-text-light)' }}>
            Use o formulário acima para adicionar pratos ao sistema.
          </p>
        </div>
      )}
    </div>
  )
}
