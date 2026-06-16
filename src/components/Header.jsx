 export default function Header({ telaAtiva, setTelaAtiva}) {
    const abas = [
        {id: 'sugestao', label: 'Sugestão da Semana'},
        {id: 'diario', label: 'Cardápio Diário'},
        {id: 'seleçao', label: 'Seleção de Pratos'},
        {id:'cadastro', label:'Cadastro'},
    ]

    return (
    <header>
        <h1>Restaurante Senac</h1>
        <nav>
            {abas.map(aba => (
                <button
                    key={aba.id}
                    onClick={() => setTelaAtiva(aba.id)}
                >
                    {aba.label}
                </button>
            ))}
        </nav>
    </header>
    )
 }
