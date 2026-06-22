import './Header.css'

export default function Header({ telaAtiva, setTelaAtiva }) {
  const abas = [
    { id: 'diario',    label: 'Cardápio Diário',     icon: '📅' },
    { id: 'sugestao',  label: 'Sugestão da Semana',  icon: '📋' },
    { id: 'selecao',   label: 'Seleção de Pratos',   icon: '✅' },
    { id: 'cadastro',  label: 'Cadastro',             icon: '📝' },
  ]

  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <div className="header-brand">
                   <div>
            <span className="header-title">Restaurante Senac</span>
          </div>
        </div>

        <nav className="header-nav" role="navigation" aria-label="Navegação principal">
          {abas.map(aba => (
            <button
              key={aba.id}
              className={`nav-tab${telaAtiva === aba.id ? ' nav-tab--active' : ''}`}
              onClick={() => setTelaAtiva(aba.id)}
              aria-current={telaAtiva === aba.id ? 'page' : undefined}
              aria-label={aba.label}
            >
              <span className="nav-tab-icon" aria-hidden="true">{aba.icon}</span>
              <span>{aba.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
