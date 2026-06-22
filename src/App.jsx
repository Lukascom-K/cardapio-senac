import { useState } from 'react'
import { CardapioProvider } from './context/CardapioContext'
import Header from './components/Header.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Selecao from './pages/Selecao.jsx'
import CardapioDiario from './pages/CardapioDiario.jsx'
import SugestaoSemanal from './pages/SugestaoSemanal.jsx'
import './index.css'
import './App.css'

function App() {
  const [telaAtiva, setTelaAtiva] = useState('diario')

  return (
    <CardapioProvider>
      {/* Skip-link para navegação por teclado/leitor de tela */}
      <a className="skip-link" href="#main-content">Ir para o conteúdo principal</a>
      <Header telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva} />
      <main id="main-content" style={{ flex: 1, background: 'var(--color-bg)' }} tabIndex={-1}>
        {telaAtiva === 'diario'   && <CardapioDiario />}
        {telaAtiva === 'sugestao' && <SugestaoSemanal />}
        {telaAtiva === 'selecao'  && <Selecao />}
        {telaAtiva === 'cadastro' && <Cadastro />}
      </main>
    </CardapioProvider>
  )
}

export default App
